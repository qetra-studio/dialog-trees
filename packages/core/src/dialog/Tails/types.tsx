import {TailConfig} from "../../tails/create-tail";

export type DialogTailMap = Record<string, DialogTailsTree>

export type DialogTailsTree = {
    config: TailConfig
    tails?: DialogTailMap
}

export type TreeKey<T extends DialogTailsTree> = keyof T extends infer K
    ? K extends string & keyof T
        ? T[K] extends { tails: infer C }
            ? C extends DialogTailMap
                ? K | `${K}.${MapKey<C>}` // if node has children nodes - provide a set of child keys
                : K
            : K
        : ''
    : '';

export type MapKey<T extends DialogTailMap> = keyof T extends infer K
    ? K extends string & keyof T
        ? T[K] extends { tails: infer C }
            ? C extends DialogTailMap
                ? K | `${K}.${MapKey<C>}` // if node has children nodes - provide a set of child keys
                : K
            : K
        : ''
    : '';
