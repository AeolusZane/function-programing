import { fromPredicate } from "fp-ts/lib/Option";

const isNumber = <T>(a: T) => !isNaN(Number(a));
const getOptionNumber = fromPredicate(isNumber);

console.log(getOptionNumber('a'));
console.log(getOptionNumber(1));

