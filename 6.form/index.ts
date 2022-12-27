import { fromPredicate, Either, left, right, chain, match } from 'fp-ts/Either';
import { pipe, identity } from 'fp-ts/function';
import { Predicate } from 'fp-ts/lib/Predicate';
import { every, map } from 'fp-ts/Array';
import { string } from 'fp-ts';

const validate = <T>(validators: Array<any>, errorMessage: string) => (value: T) => pipe(
    value,
    fromPredicate(
        (val) => pipe(
            validators,
            map(fn => fn(val)),
            every(Boolean),
        ),
        () => errorMessage
    ),
);

const startWith = (search: string): Predicate<string> => (value: string): boolean => value.startsWith(search);

const minLength = (length: number): Predicate<string> => (value: string): boolean => value.length >= length;

const maxLength = (length: number): Predicate<string> => (value: string): boolean => value.length <= length;

const testPhoneNumberPattern = (value: string): boolean => {
    const pattern = /^\+?[0-9]{8,15}$/;
    return pattern.test(value);
};

const validatePhoneNumber = validate([startWith('+'), minLength(8), maxLength(15), testPhoneNumberPattern], 'default error message');

// console.log(validatePhoneNumber('+123456789'));
// console.log(validatePhoneNumber('+12345678'));
// console.log(validatePhoneNumber('+12345678901234567890'));

const validatePhoneNumber2 = (phoneNumber: string): Either<string, string> =>
    pipe(
        phoneNumber,
        validate([minLength(1)], 'phone number must not be empty'),
        chain(validate(
            [
                testPhoneNumberPattern,
                startWith('+'),
                minLength(8),
                maxLength(15),
            ],
            'default error message'
        )),
    );

const changeValue = (value: string): boolean => {
    return pipe(
        value,
        validatePhoneNumber2,
        match(
            (val) => {
                console.log('error❌:', val);
                return false
            },
            (v) => {
                console.log('success✅', v);
                return true
            }
        )
    )
}

console.log(validatePhoneNumber2('+123456789'));
console.log(validatePhoneNumber2('+12345678'));
console.log(validatePhoneNumber2('+12345678901234567890'));
console.log(validatePhoneNumber2(''));

console.log(changeValue('+123456789'));
console.log(changeValue('aa'));