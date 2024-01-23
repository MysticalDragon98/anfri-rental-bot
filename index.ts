import { log } from "termx";
import Styles from "./lib/const/styles.const";
import { $PUBLIC_KEY } from "./lib/env";
//* Imports


async function main () {
    log("🤖 Hello, i'm Ricky, the rental bot, first let's check how many NFTs do we have at hand.");
    log("🤖 You can also call me " + Styles.address($PUBLIC_KEY) + " if you want.");
    log("🤖 Please wait while i'm booting up...");
    log("🤖 Logging in in the blockchain service...");

    //* Post Main
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);