import { log } from "termx";
import Styles from "./lib/const/styles.const";
import { $ETH_ADDRESS } from "./lib/env";
import login from "./lib/modules/auth/login";
import $try from "./lib/modules/utils/$try";
import web3 from "./plugins/web3";
import { MSBlockchain } from "./lib/services";
//* Imports


async function main () {
    log("🤖 Hello, i'm Ricky, the rental bot, first let's check how many NFTs do we have at hand.");
    log("🤖 You can also call me " + Styles.address($ETH_ADDRESS) + " if you want.");
    log("🤖 Please wait while i'm booting up...");
    log("🤖 Logging in in the blockchain service...");

    //* Post Main
    const token = await login();

    log("🤖 Checking my wallet...");
    
    console.log("Checking for gas...");
    const gas = await $try(() => web3.eth.getBalance($ETH_ADDRESS));

    console.log("Checking for anfri-orbs...");
    const orbs = await $try(() => AnfriOrbs.methods.balanceOf($ETH_ADDRESS).call());

    console.log("Checking for my anfris...");
    const myAnfris = await $try(() => MSBlockchain.myAnfris({ token }));
}

main().catch(console.log);

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);