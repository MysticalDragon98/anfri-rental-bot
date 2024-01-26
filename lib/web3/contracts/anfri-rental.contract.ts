import createContract from "../../../plugins/web3/contracts";

const AnfriRentalContract = (addr: string) => createContract("anfri-rental", addr);


export default AnfriRentalContract;