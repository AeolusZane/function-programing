import { makeValidator, Predicate, validationCheck } from "./utils";


const startWith = (search: string): Predicate<string> => (value: string): boolean => value.startsWith(search);

const minLength = (length: number): Predicate<string> => (value: string): boolean => value.length >= length;

const maxLength = (length: number): Predicate<string> => (value: string): boolean => value.length <= length;

const testPhoneNumberPattern = (value: string): boolean => {
    const pattern = /^\+?[0-9]{8,15}$/;
    return pattern.test(value);
};

const v1 = makeValidator([minLength(1)], 'phone number must not be empty');
const v2 = makeValidator([startWith('+')], '前面请带加号');
const v3 = makeValidator([minLength(8), maxLength(15)], '长度在8-15之间');
const v4 = makeValidator([testPhoneNumberPattern], '格式不正确，请输入正确的数字');

// 最小字符串长度为15,不足补齐
function minStringlen(str: string, len: number) {
    return str.padEnd(len, ' ');
}

const phoneNumberCheck = validationCheck(v1, v2, v3, v4)(
    (val: string) => {
        console.log(`${minStringlen(val, 20)}✅:`, val);
    },
    (val: string, msg: string) => {
        console.log(`${minStringlen(val, 20)}❌:`, msg);
    }
);




phoneNumberCheck('+123456789'); // right
phoneNumberCheck('123456789');  // left 前面没有加号
phoneNumberCheck('+12');      // left 长度不对
phoneNumberCheck('');        // left 为空
phoneNumberCheck('+12345678asdfsfasf9');    // left 长度不对
phoneNumberCheck('+abcasdfasd');   // left 格式不正确
phoneNumberCheck('123456789'); // right