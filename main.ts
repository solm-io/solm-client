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
    const client = new LotteryClient("https://api.mainnet-beta.solana.com", Keypair.fromSecretKey(bs58.decode(privateKey)));
    // const client = new LotteryClient("https://api.testnet.solana.com", Keypair.fromSecretKey(bs58.decode(privateKey)));

    //loop 1000 times
    for (let i = 0; i < 1000; i++) {
        const tx = await client.draw();
        console.log("draw tx", tx);
        //sleep 5 second
        await sleep(1000 * 5);
    }
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
