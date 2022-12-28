import { pipe } from 'fp-ts/lib/function';
import { Either, left, right, chain } from 'fp-ts/lib/Either';

const multiByTen = <T>(value: T): Either<string, number> =>
    typeof value === 'number' ? right(value * 10) : left('Not a number');

const increment = (value: number): Either<string, number> => right(value + 1);

const func = <T>(value: T) => pipe(
    value,
    multiByTen,
    chain(increment),
    console.log
)

func(1); // => 11

func('a'); // => { _tag: 'Left', left: 'Not a number' }