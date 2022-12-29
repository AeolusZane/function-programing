import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";

function taskEitherTest(isResolve: boolean): TaskEither<string, string> {
    return tryCatch(
        () => isResolve ? Promise.resolve("success") : Promise.reject("error"),
        () => 'fall back string'
    );
}

async function run(){
    const resolve = await taskEitherTest(true)();
    console.log(resolve);

    const reject = await taskEitherTest(false)();
    console.log(reject);
}
run();