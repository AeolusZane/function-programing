import { Task } from "fp-ts/lib/Task";
import { createInterface } from "readline";

const read: Task<string> = () => {
    return new Promise<string>((resolve) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Input: ", (answer) => {
            rl.close();
            console.log(answer);
            resolve(answer);
        });
    })
}

read();