import {ReactNode} from "react";

export interface DialogSlots {
    title: ReactNode;
    content: ReactNode;
    actions?: ReactNode;
}

export type Tail<P = {}, T = {}> = {
    projector: (...args: ProjectorArgs<P, T>) => DialogSlots
} & WithTails<T>


export interface TailScopeContext<Tail> {
    navigate: NavigationFn<Tail>
}

type ProjectorArgs<Props, Tails> = [Props, TailScopeContext<Tail<Props, Tails>>]

type WithTails<T> = T extends never | void | undefined | null ? {} : { tails: TailsTree<T> }

type DenormalizedTree = Record<string, any>

export type TailsTree<T> = T extends DenormalizedTree ?
    {
        [K in keyof T]: T[K] extends {
            tails?: infer Tails
        } ? T[K] extends {
                projector: (...args: ProjectorArgs<infer P, Tails>) => DialogSlots,
            }
            ? Tail<P, Tails>
            : never
        : never
    }
    : never;

type KeySeparator = '.';

type TraversedKey<T> = T extends DenormalizedTree ?
    T extends { tails?: infer Tails }
        ? Tails extends DenormalizedTree
            ? {
                [K in keyof Tails]: K extends string
                    ? `${K}` | `${K}${KeySeparator}${TraversedKey<Tails[K]>}`
                    : never
            }[keyof Tails]
            : never
        : never
    : never;

export type TailKey<T> = '' // root
    | TraversedKey<T>

export type TailType<T> = TailValue<T, ''>;

export type TailValue<T, K extends TailKey<T>> =
    T extends DenormalizedTree ?
        T extends {
                tails?: infer Tails
            } ?
            T extends {
                    projector: (...args: ProjectorArgs<infer P, Tails>) => DialogSlots,
                } ?
                K extends `${infer Head}${KeySeparator}${infer Rest}` ?
                    Head extends keyof Tails ?
                        Tails[Head] extends {
                                tails?: infer TT
                            } ? Tails[Head] extends {
                                    projector: (...args: ProjectorArgs<infer P, TT>) => DialogSlots,
                                } ?
                                Rest extends TailKey<Tails[Head]> ?
                                    TailValue<Tails[Head], Rest>
                                    : never
                                : never
                            : never
                        : never
                    : K extends '' ?
                        T
                        : K extends keyof T['tails']
                            ? T['tails'][K]
                            : never
                : never
            : never
        : never;

export type TailOptions<T, K extends TailKey<T> =''> = TailValue<T, K> extends never
    ? never
    : Parameters<TailValue<T, K>['projector']> extends ProjectorArgs<infer Props, infer Tree>
        ? ProjectorArgs<Props, Tree>[0]
        : never


export interface TailHistoryItem<T, K extends TailKey<T>> {
    key: K,
    props: TailOptions<T, K>
    label: ReactNode
    goBackLabel?: ReactNode
    breadcrumbLabel?: ReactNode
}

export type TailNavigationHistory<T> = TailHistoryItem<T, TailKey<T>>[]


export type FollowOptions<Tail, K extends TailKey<Tail>> = {
    strategy?: 'follow',
} & Omit<TailHistoryItem<Tail, K>, 'key'>

export type ReturnOptions<Tail, K extends TailKey<Tail>> = {
    strategy: 'return'
} & {
    props?: Partial<TailOptions<Tail, K>>
}

export type NavigationOptions<Tail, K extends TailKey<Tail>> = FollowOptions<Tail, K> | ReturnOptions<Tail, K>

export type NavigationFn<Tail> = <K extends TailKey<Tail>>(key: K, options: NavigationOptions<Tail, K>) => void

