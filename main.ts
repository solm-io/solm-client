import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider } from "@coral-xyz/anchor";
import userKey from "./.wallets/user.json";
import { Lottery, IDL } from "./lottery";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

const accounts = {
    lottery: "5ZDcaBjd1EWvsCLizS8xxs37NTDnWPQzzEQCUVBSRGfE",
    config: "5T4kEBmwx3mJaoUmbiE7iJiMmKmodTGoi5fb6nGx742h",
    mint: "DpUArpqrtV2GqMcgWNpgD3cDJgaPKCaDnf3Ab1fX2Dki",
};

async function main() {
    // const connection = new Connection("https://api.mainnet-beta.solana.com");
    const connection = new Connection("https://api.testnet.solana.com");
    const userKeyPair = Keypair.fromSecretKey(new Uint8Array(userKey));
    const wallet = new NodeWallet(userKeyPair);
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    const program = new anchor.Program(IDL, accounts.lottery, provider);
    const mintKey = new PublicKey(accounts.mint);
    const configKey = new PublicKey(accounts.config);
    const tx = await draw(program, mintKey, configKey, userKeyPair);
    console.log("tx", tx);

    const userAccountAddress = getUserAccountAddress(program, userKeyPair.publicKey);
    let userAccount = await program.account.userAccount.fetchNullable(userAccountAddress);
    console.log("userAccount", userAccount);
}

function getUserAccountAddress(program: anchor.Program<Lottery>, user: PublicKey): PublicKey {
    let [key] = PublicKey.findProgramAddressSync([Buffer.from("user-account"), user.toBuffer()], program.programId);
    return key;
}

async function draw(program: anchor.Program<Lottery>, mintKey: PublicKey, configKey: PublicKey, userKeyPair: Keypair) {
    let config = await program.account.configAccount.fetchNullable(configKey);
    const tokenAddress = await anchor.utils.token.associatedAddress({ mint: mintKey, owner: userKeyPair.publicKey });
    console.log("tokenAddress", tokenAddress);
    const feeTo = config.feeTo;
    const [mintAuthorityPda, mintAuthorityPdaBump] = await anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("mint_authority_"), mintKey.toBuffer()], program.programId);
    const userAccountAddress = getUserAccountAddress(program, userKeyPair.publicKey);
    return await program.methods
        .draw(mintAuthorityPdaBump)
        .accounts({
            userSigner: userKeyPair.publicKey,
            configAccount: configKey,
            userAccount: userAccountAddress,
            feeTo,
            mintAccount: mintKey,
            mintAuthority: mintAuthorityPda,
            recipient: userKeyPair.publicKey,
            tokenAccount: tokenAddress,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        })
        .signers([userKeyPair])
        .rpc();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
