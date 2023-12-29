import { Keypair } from "@solana/web3.js";
import { privateKey } from "./key.json";
import { LotteryClient } from "./client";
import * as bs58 from "bs58";

//npx ts-node main.ts
main().catch((error) => {
    console.error(error);
    process.exit(1);
});

async function main() {
    // const client = new LotteryClient("https://api.mainnet-beta.solana.com", Keypair.fromSecretKey(bs58.decode(privateKey)));
    const client = new LotteryClient("https://api.testnet.solana.com", Keypair.fromSecretKey(bs58.decode(privateKey)));
    const tx = await client.draw();
    console.log("draw tx", tx);
    const configAccount = await client.queryConfigAccount();
    const userAccount = await client.queryUserAccount();
    console.log("configAccount", configAccount);
    console.log("userAccount", userAccount);
}
