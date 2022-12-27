import { fromPredicate, Either, match, chain, right } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
export { Predicate } from 'fp-ts/lib/Predicate';
import { every, map } from 'fp-ts/Array';

export const validate = <T>(validators: Array<any>, errorMessage: string) => (value: T) => pipe(
    value,
    fromPredicate(
        val => pipe(
            validators,
            map(fn => fn(val)),
            every(Boolean),
        ),
        () => errorMessage,
    ),
);

export const validationCheck = (...p: (<T>() => (value: T) => Either<string, T>)[]) => (
    resolve: Function = () => { },
    reject: Function = () => { }
) => (value: string) => {
    const [t0, ...tn] = p;
    let errorTips = 'default error message'
    return pipe(
        value,
        t0(),
        chain(fromPredicate(
            val => pipe(
                tn,
                map(fn => chain(fn())),
                every(fn => {
                    const res = fn(right(val));
                    res._tag === 'Left' && (errorTips = res.left || errorTips);
                    return res._tag === 'Right';
                }),
            ),
            () => errorTips,
        )),
        match(
            (msg) => {
                reject(value, msg);
                return false
            },
            (val) => {
                resolve(val);
                return true
            },
        )
    );
}
export const makeValidator = (validators: Array<(val: any) => boolean>, errorMessage: string) => {
    return <T>() => validate<T>(validators, errorMessage);
}

