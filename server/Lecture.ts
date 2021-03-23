import { v4 } from "https://deno.land/std/uuid/mod.ts";
class Lecture {
    tutor: string;
    id: string;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
    }

}

export default Lecture;
