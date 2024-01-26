import createContract from "../../../plugins/web3/contracts";

const AnfriOrbsContract = (addr: string) => createContract("anfri-orbs", addr);

export default AnfriOrbsContract;