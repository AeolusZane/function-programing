import { Either, tryCatch } from "fp-ts/lib/Either";

function parse(s: string) {
    return tryCatch(() => JSON.parse(s), reason => new Error(String(reason)));
}

const result = parse("foo");
console.log(result); // => left(Error: Unexpected token f in JSON at position 0)
const success = parse('{"foo": "bar"}');
console.log(success); // => right({ foo: "bar" })

// Path: either.ts