import { Either, left, right, chain } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';


const validateChain = <T>(validators: Array<any>, errorMessage: string) => (value: T) => pipe(
    value,
    validators[0](errorMessage),
    chain(validators[1](errorMessage)),
    chain(validators[2](errorMessage)),
);

const validate0 = <T extends number | string>(errorMsg: string) => (value: T): Either<string, number | string> => {
    return typeof value === 'number' ? right(value) : left('value must be a number');
}

const validate1 = <T extends number>(errorMsg: string) => (value: T): Either<string, number> => {
    return value > 0 ? right(value) : left('value must be greater than 0');
}

const validate2 = <T extends number>(errorMsg: string) => (value: T): Either<string, number> => {
    return value < 10 ? right(value) : left(errorMsg);
}

const validateTest = validateChain([validate0, validate1, validate2], 'default error message');

console.log(validateTest('1a0'));
console.log(validateTest(-1));
console.log(validateTest(11));
console.log(validateTest(1));
