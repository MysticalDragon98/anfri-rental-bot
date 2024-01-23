import { HTTPProxy } from "../plugins/http-proxies";
import { $BLOCKCHAIN_SERVICE } from "./env";

export const MSBlockchain = HTTPProxy($BLOCKCHAIN_SERVICE);