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

const validationCheck = (...p: (<T>() => (value: T) => Either<string, T>)[]) => (value: string) => {
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
            (val) => {
                console.log(`${minStringlen(value, 20)}❌:`, val);
                return false
            },
            (val) => {
                console.log(`${minStringlen(value, 20)}✅:`, val);
                return true
            },
        )
    );
}

// 最小字符串长度为15,不足补齐
function minStringlen(str: string, len: number) {
    return str.padEnd(len, ' ');
}



const startWith = (search: string): Predicate<string> => (value: string): boolean => value.startsWith(search);

const minLength = (length: number): Predicate<string> => (value: string): boolean => value.length >= length;

const maxLength = (length: number): Predicate<string> => (value: string): boolean => value.length <= length;

const testPhoneNumberPattern = (value: string): boolean => {
    const pattern = /^\+?[0-9]{8,15}$/;
    return pattern.test(value);
};

const makeValidator = (validators: Array<any>, errorMessage: string)=>{
    return <T>() => validate<T>(validators, errorMessage);
}

const v1 = makeValidator([minLength(1)], 'phone number must not be empty');
const v2 = makeValidator([startWith('+')], '前面请带加号');
const v3 = makeValidator([minLength(8), maxLength(15)], '长度在8-15之间');
const v4 = makeValidator([testPhoneNumberPattern], '格式不正确，请输入正确的数字');

const phoneNumberCheck = validationCheck(v1, v2, v3, v4);

phoneNumberCheck('+123456789'); // right
phoneNumberCheck('123456789');  // left 前面没有加号
phoneNumberCheck('+12');      // left 长度不对
phoneNumberCheck('');        // left 为空
phoneNumberCheck('+12345678asdfsfasf9');    // left 长度不对
phoneNumberCheck('+abcasdfasd');   // left 格式不正确
phoneNumberCheck('123456789'); // right