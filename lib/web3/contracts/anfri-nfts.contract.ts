import createContract from "../../../plugins/web3/contracts";

const AnfriNftsContract = (addr: string) => createContract("anfri-nfts", addr);


export default AnfriNftsContract;