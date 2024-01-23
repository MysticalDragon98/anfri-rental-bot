import { ecsign, hashPersonalMessage, toRpcSig } from "ethereumjs-util";

export default async function ethSign (data: string, privKey: string) {
    const privKeyBuffer = Buffer.from(privKey.substring(2), "hex");
    const hash = hashPersonalMessage(Buffer.from(data));
    const sig = ecsign(hash, privKeyBuffer);
    const serial = toRpcSig(sig.v, sig.r, sig.s);

    return serial;
}