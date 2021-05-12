export function not(a: number[], b: number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a: number[], b: number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export function union(a: number[], b: number[]) {
    return [...a, ...not(b, a)];
}