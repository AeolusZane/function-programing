import { identity, pipe } from 'fp-ts/function';
import { fromNullable, map, match } from 'fp-ts/lib/Option';

const conjoin = (flock_x: number) => (flock_y: number) => { return flock_x + flock_y };
const breed = (flock_x: number) => (flock_y: number) => { return flock_x * flock_y };

const flock_a = 4;
const flock_b = 2;
const flock_c = 0;

// var result = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a, flock_b));

const breed_b = breed(flock_b);
const conjoin_a = conjoin(flock_a);
const conjoin_a_b = conjoin(breed_b(flock_a));

const result = pipe(
    flock_c,
    fromNullable,
    map(conjoin_a),
    map(breed_b),
    map(conjoin_a_b),
    match<number, number>(
        () => 0,
        identity,
    )
)

// flock_c.conjoin(flock_a).breed(flock_b).conjoin(flock_a.breed(flock_b)) = 16

const result1 = pipe(
    flock_c,
    fromNullable,
    map(conjoin(flock_a)),
    map(breed(flock_b)),
    map(conjoin(breed(flock_b)(flock_a))),
    match<number, number>(
        () => 0,
        identity,
    )
);

const result2 = pipe(
    flock_a,
    conjoin_a,
    breed_b,
)

console.log(result);

console.log(result1);

console.log(result2);