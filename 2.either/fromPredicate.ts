import { fromPredicate } from "fp-ts/lib/Either";

const isEmptyString = (s: string) => s === '';

const getEitherEmptyString =
    fromPredicate(
        (s: string) => !isEmptyString(s),
        s => 'defaultValue'
    );

console.log(getEitherEmptyString(''));
console.log(getEitherEmptyString('123'));