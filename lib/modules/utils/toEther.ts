import web3 from "../../../plugins/web3";

export default function toEther (val: BigInt | number | string) {
    return web3.utils.fromWei(val.toString(), 'ether');
}