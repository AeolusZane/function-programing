import { fromNullable } from "fp-ts/lib/Either";

const getEitherNumber = fromNullable(new Error("Not a number"));

console.log(getEitherNumber("a"));
console.log(getEitherNumber(1));
console.log(getEitherNumber(null));