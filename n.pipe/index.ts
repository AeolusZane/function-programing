import { pipe } from 'fp-ts/lib/function';
const add = (a: number) => (b: number) => a + b;

const add1 = add(1);
const add2 = add(2);
const add3 = add(3);

console.log(add3(add2(add1(2)))); // => 8


console.log(pipe(2, add1, add2, add3)); // => 8