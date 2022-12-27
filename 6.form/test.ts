import { fromPredicate, Either, match, chain, right } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
export { Predicate } from 'fp-ts/lib/Predicate';
import { every, map } from 'fp-ts/Array';
import { Predicate } from 'fp-ts/lib/Predicate';

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

export const check = <T>(val: T) => (valid: (...val: any[]) => Either<string, T>, otherValids: ((...val: any[]) => Either<string, T>)[]) => (
    errFunc: (msg: string) => boolean = () => false,
    successFunc: () => boolean = () => true,
): boolean => {
    const ov = chain(otherValids[0]);

    return pipe(
        val,
        valid,
        ov,
        match(
            errFunc,
            successFunc,
        ),
    );
};

const startWith = (search: string): Predicate<string> => (value: string): boolean => value.startsWith(search);

const minLength = (length: number): Predicate<string> => (value: string): boolean => value.length >= length;

const maxLength = (length: number): Predicate<string> => (value: string): boolean => value.length <= length;

const testPhoneNumberPattern = (value: string): boolean => {
    const pattern = /^\+?[0-9]{8,15}$/;
    return pattern.test(value);
};

const sum = (a: number, b: number) => a + b;
const v1 = <T>() => validate<T>([minLength(1)], 'phone number must not be empty');
const v2 = <T>() => validate<T>([startWith('+')], '前面请带加号');
const v3 = <T>() => validate<T>([minLength(8), maxLength(15)], '长度在8-15之间');
const v4 = <T>() => validate<T>([testPhoneNumberPattern], '格式不正确，请输入正确的数字');

const validatePhoneNumber = <T>(phoneNumber: string, ...p: (<T>() => (value: T) => Either<string, T>)[]) => {
    const [t0, ...tn] = p;
    let errorTips = 'default error message'
    return pipe(
        phoneNumber,
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
            (val) => {
                console.log(`${minStringlen(phoneNumber, 20)}❌:`, val);
                return false
            },
            (val) => {
                console.log(`${minStringlen(phoneNumber, 20)}✅:`, val);
                return true
            },
        )
    );
}

// 最小字符串长度为15,不足补齐
function minStringlen(str: string, len: number) {
    return str.padEnd(len, ' ');
}

validatePhoneNumber('+123456789', v1, v2, v3); // right
validatePhoneNumber('123456789', v1, v2, v3);  // left 前面没有加号
validatePhoneNumber('+12', v1, v2, v3);      // left 长度不对
validatePhoneNumber('', v1, v2, v3);        // left 为空
validatePhoneNumber('+12345678asdfsfasf9', v1, v2, v3);    // left 长度不对
validatePhoneNumber('+abcasdfasd', v1, v2, v3, v4);   // left 格式不正确
validatePhoneNumber('123456789', v2); // right