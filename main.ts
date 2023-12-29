import userKey from "./key.json";
import { Keypair } from "@solana/web3.js";
import { LotteryClient } from "./client";

//npx ts-node main.ts
main().catch((error) => {
    console.error(error);
    process.exit(1);
});

async function main() {
    // const client = new LotteryClient("https://api.mainnet-beta.solana.com", Keypair.fromSecretKey(new Uint8Array(userKey)));
    const client = new LotteryClient("https://api.testnet.solana.com", Keypair.fromSecretKey(new Uint8Array(userKey)));
    const tx = await client.draw();
    console.log("draw tx", tx);
    const configAccount = await client.queryConfigAccount();
    const userAccount = await client.queryUserAccount();
    console.log("configAccount", configAccount);
    console.log("userAccount", userAccount);
}
