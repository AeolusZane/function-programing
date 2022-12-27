import { fromPredicate, match } from "fp-ts/lib/Option";
import { identity, pipe } from 'fp-ts/lib/function';

pipe(
    2,
    fromPredicate(value => value != 0),
    match(() => 0, value => 10 / value), // 10/value 是非0返回的默认值
    console.log
)

pipe(
    0,
    fromPredicate(value => value != 0),
    match(() => 0, value => 10 / value), // 10/value 是非0返回的默认值
    console.log
)