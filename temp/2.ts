// const three = (p: any) => 3;

// const add = (x: number, y: number) => x + y;

// const non_term = (x: number, y:number = 1): number => non_term(add(x + y));

// console.log(three(non_term(0)));

/**
 * 纯函数式编程解决上述死循环问题
 */

const three = (p: any) => 3;
const add = (x: number) => (y: number) => x + y;

const non_term = (x: number): any => {
    const addx = add(x);
    return (y: number = 1) => non_term(addx(y));
}

console.log(three(non_term(0)));
