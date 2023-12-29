import userKey from "./.wallets/user.json";
import { Keypair } from "@solana/web3.js";
import { LotteryClient } from "./client";

//npx ts-node main.ts
main().catch((error) => {
    console.error(error);
    process.exit(1);
});

async function main() {
    // const connection = new Connection("https://api.mainnet-beta.solana.com");
    const lotteryClient = new LotteryClient("https://api.testnet.solana.com", Keypair.fromSecretKey(new Uint8Array(userKey)));
    const tx = await lotteryClient.draw();
    console.log("draw tx", tx);
    const configAccount = await lotteryClient.queryConfigAccount();
    const userAccount = await lotteryClient.queryUserAccount();
    console.log("configAccount", configAccount);
    console.log("userAccount", userAccount);
}
