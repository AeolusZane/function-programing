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

const len = (list: number[]): number => {
    if (list.length === 0) {
        return 0;
    }

    return 1 + len(f_xs(list));
}

console.log(len(v1));

/**
 * no loops
 */