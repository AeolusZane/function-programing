import { Option, some, none } from "fp-ts/lib/Option";

function findIndex<A>(
    as: Array<A>,
    predicate: (a: A) => boolean
): Option<number> {
    const index = as.findIndex(predicate);
    return index === -1 ? none : some(index);
}

const result = findIndex([1, 2, 3], (a) => a === 2);
console.log(result); // => some(1)
