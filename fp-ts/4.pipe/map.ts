import { pipe } from 'fp-ts/lib/function';
import { fromNullable, map, fromPredicate } from 'fp-ts/lib/Option';

function t(a: any) {
    return a + 'fuck u bitch!';
}

pipe(
    'something value',
    fromNullable,
    map(value => value.length),
    map(value => value + 1),
    map(value => value.toString()),
    console.log
);


pipe(
    1,
    fromPredicate(value => value < 0),
    map(value => value + value),
    map(value => [value]),
    console.log
)
