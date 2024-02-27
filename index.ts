import { log } from "termx";
import Styles from "./lib/const/styles.const";
import { $ETH_ADDRESS } from "./lib/env";
import login from "./lib/modules/auth/login";
import $try from "./lib/modules/utils/$try";
import web3 from "./plugins/web3";
import { MSBlockchain } from "./lib/services";
import AnfriOrbsContract from "./lib/web3/contracts/anfri-orbs.contract";
import toEther from "./lib/modules/utils/toEther";
import { zeroAddress } from "ethereumjs-util";
import AnfriNftsContract from "./lib/web3/contracts/anfri-nfts.contract";
import AnfriRentalContract from "./lib/web3/contracts/anfri-rental.contract";
//* Imports


async function main () {
    log("🤖 Hello, i'm Ricky, the rental bot, first let's check how many NFTs do we have at hand.");
    log("🤖 You can also call me " + Styles.address($ETH_ADDRESS) + " if you want.");
    log("🤖 Please wait while i'm booting up...");
    log("🤖 Logging in in the blockchain service...");

    //* Post Main
    const token = await login();
    const contracts = await MSBlockchain.network.contracts();
    const AnfriOrbs = AnfriOrbsContract(contracts.orbs);
    const AnfriNFTs = AnfriNftsContract(contracts.nfts);
    const AnfriRental = AnfriRentalContract(contracts.rental);
    const SENDDATA = { from: $ETH_ADDRESS, type: "0x1" };

    log("🤖 Checking my wallet...");
    
    log("Checking for gas...");
    const gas = await $try(() => web3.eth.getBalance($ETH_ADDRESS));

    log("Checking for anfri-orbs...");
    const orbs = await $try(() => AnfriOrbs.methods.balanceOf($ETH_ADDRESS).call());

    log("Checking for my anfris...");
    const myAnfris = await $try(() => MSBlockchain.nfts.myAnfris({ token }));

    log(Styles.title("   - Anfri Orbs: "), toEther(orbs));
    log(Styles.title("   - Gas: "), toEther(gas));
    log(Styles.title("   - Total NFTs: "), myAnfris.length);
    log(Styles.title("   - Total NFTs in rent marketplace: "), myAnfris.filter(anfri => anfri.holder === contracts.rental).length);
    log(Styles.title("   - Total rented NFTs marketplace: "), myAnfris.filter(anfri => {
        return anfri.holder === contracts.rental && anfri.user !== zeroAddress
    }).length);


    main:
    for (const anfri of myAnfris) {
        while (true) if (contracts.rental !== anfri.holder) {
            log(`🤖 Hmmm the Anfri #${anfri.id} is not in the marketplace, his holder is ${Styles.address(anfri.owner)} instead.`);
            
            if (anfri.holder !== $ETH_ADDRESS) {
                log(`🤖Hmm you are not the holder of the Anfri #${anfri.id}, his holder is ${Styles.address(anfri.owner)} instead, i'm gonna skip this for now...`);
                continue main;
            }

            log(`🤖 Approving Anfri #${anfri.id} in marketplace...`);
            await AnfriNFTs.methods.approve(contracts.rental, anfri.id).send(SENDDATA); 
            
            log(`🤖 Publishing Anfri #${anfri.id} in marketplace...`);
            await AnfriRental.methods.publish(anfri.id, 0, 0, 50).send(SENDDATA);

            log(`🤖 Ok, now the #${anfri.id} is now in the marketplace...`);
            break;
        } else {
            //log(`🤖 Unpublishing Anfri #${anfri.id} from marketplace...`);
            //await AnfriRental.methods.unpublish(anfri.id).send(SENDDATA);
            //anfri.holder = $ETH_ADDRESS;
            break;
        }
    }
}

main().catch(console.log);

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);