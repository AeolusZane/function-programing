// declavative programming

// 1.if list length is empty, then len(l) = 0.

// 2.if list length is not empty, and if xs is
//   the list l without its first element, then len(l) = 1 + len(xs).

// list which result from list xs by inserting x in front.
const fx = (x: number) => (xs: number[]): number[] => {
    if (xs.length === 0) {
        return [x];
    }

    return [x, ...xs];
}

// every non-empty list can be constructed by

const v1 = fx(3)(fx(2)(fx(1)([]))); // = [3, 2, 1]

const f_xs = (list: number[]): number[] => {
    if (list.length === 0) {
        return [];
    }
    const [x, ...xs] = list; // destructuring assignment

    return xs;
};

const f_x = (list: number[]): number | undefined => {
    if (list.length === 0) {
        return undefined;
    }
    const [x, ...xs] = list; // destructuring assignment

    return x;
};

console.log(v1);

// len([]) == 0
// len(fx(x:xs)) == 1 + len(xs)

// list can be any type, not just number
const len = (list: number[]): number => {
    if (list.length === 0) {
        return 0;
    }

    return 1 + len(f_xs(list));
}

console.log(len(v1));

/**
 * · no loops,just recursion
 * · no side effects, 相同参数总是产生相同结果, called refferential transparency
 * · polymorphic type system(泛型来自于函数式编程)
 * · 内存管理是自动完成的，不像c一类的语言需要手动释放内存
 * · 函数式编程的函数是一等公民，可以作为参数传递，也可以作为返回值
 */