import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";

class Lecture {
    tutor: string;
    id: string;
    link: string;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        this.link = cryptoRandomString({length: 7, type: 'numeric'});
    }

}

export default Lecture;
