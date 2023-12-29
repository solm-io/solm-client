import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { Lottery, IDL } from "./lottery";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export class LotteryClient {
    private connection: Connection;
    private wallet: Wallet;
    private provider: anchor.Provider;
    private program: anchor.Program<Lottery>;
    private mintKey: PublicKey;
    private configKey: PublicKey;
    constructor(
        readonly endpoint: string,
        readonly userKeyPair: Keypair
    ) {
        const accounts = {
            lottery: "5ZDcaBjd1EWvsCLizS8xxs37NTDnWPQzzEQCUVBSRGfE",
            config: "5T4kEBmwx3mJaoUmbiE7iJiMmKmodTGoi5fb6nGx742h",
            mint: "DpUArpqrtV2GqMcgWNpgD3cDJgaPKCaDnf3Ab1fX2Dki",
        };
        this.connection = new Connection(endpoint);
        this.wallet = new NodeWallet(userKeyPair);
        this.provider = new AnchorProvider(this.connection, this.wallet, AnchorProvider.defaultOptions());
        this.program = new anchor.Program(IDL, accounts.lottery, this.provider);
        this.mintKey = new PublicKey(accounts.mint);
        this.configKey = new PublicKey(accounts.config);
    }

    async getAssociatedTokenAddress() {
        return await anchor.utils.token.associatedAddress({ mint: this.mintKey, owner: this.userKeyPair.publicKey });
    }

    async queryConfigAccount() {
        return await this.program.account.configAccount.fetchNullable(this.configKey);
    }

    getUserAccountAddress(): PublicKey {
        const [key] = PublicKey.findProgramAddressSync([Buffer.from("user-account"), this.userKeyPair.publicKey.toBuffer()], this.program.programId);
        return key;
    }

    async queryUserAccount() {
        const userAccountAddress = this.getUserAccountAddress();
        return await this.program.account.userAccount.fetchNullable(userAccountAddress);
    }

    async draw() {
        const config = await this.queryConfigAccount();
        const tokenAddress = await this.getAssociatedTokenAddress();
        const feeTo = config.feeTo;
        const [mintAuthorityPda, mintAuthorityPdaBump] = await anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("mint_authority_"), this.mintKey.toBuffer()],
            this.program.programId
        );
        const userAccountAddress = this.getUserAccountAddress();
        return await this.program.methods
            .draw(mintAuthorityPdaBump)
            .accounts({
                userSigner: this.userKeyPair.publicKey,
                configAccount: this.configKey,
                userAccount: userAccountAddress,
                feeTo,
                mintAccount: this.mintKey,
                mintAuthority: mintAuthorityPda,
                recipient: this.userKeyPair.publicKey,
                tokenAccount: tokenAddress,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
            })
            .signers([this.userKeyPair])
            .rpc();
    }
}
