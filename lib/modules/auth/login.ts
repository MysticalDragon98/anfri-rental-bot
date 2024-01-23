import { log } from "termx";
import web3 from "../../../plugins/web3";
import { $ETH_ADDRESS, $ETH_PRIVKEY } from "../../env";
import { MSBlockchain } from "../../services";
import ethSign from "../ethereum-utils/ethSign";

//* Imports

export default async function login () {
    const message = await MSBlockchain.Auth.loginMessage({
        ethAddress: $ETH_ADDRESS
    });

    const signature = await ethSign(message, $ETH_PRIVKEY);

    return await MSBlockchain.Auth.login({
        signature,
        ethAddress: $ETH_ADDRESS
    });
}