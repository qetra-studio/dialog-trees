export function lastIndexBy<T>(array: T[], predicate: (item: T, index: number) => boolean) {
    let index = -1
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i)) {
            index = i;
            break;
        }
    }

    return index;
}
