//* Imports

import { log } from "termx";
import Styles from "../../const/styles.const";

export default async function $try (fn: any, wait: number = 1) {
    const prom = fn();

    if (!prom.catch) return prom;
    return prom.catch(exc => {
        if (exc.message == "ESOCKETTIMEDOUT") {
            let next = wait < 64? wait * 2 : 64;
            log(Styles.title("🤖 I'm having connection issues... Will try again in " + (next) + " seconds..."));
            $try(fn, next);
        }

        throw exc;
    });
}