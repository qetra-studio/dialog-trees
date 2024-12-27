import {TailHistoryItem} from "@dialog/Dialog/types";
import {DialogSlots} from "@types";

export interface TailScopeContext<Tail> {
    navigate: <K extends TailKey<Tail>, >(key: K, item: Omit<TailHistoryItem<Tail, K>, 'key'>) => void;
    goBack: () => void
}

interface ProjectorArgs<Props, Tails> {
    props: Props,
    ctx: TailScopeContext<Tail<Props, Tails>>
}

export type Tail<P = {}, T = {}> = {
    projector: (args: ProjectorArgs<P, T>) => DialogSlots
} & WithTails<T>

type WithTails<T> = T extends never | void | undefined | null ? {} : { tails: TailsTree<T> }

type DenormalizedTree = Record<string, any>

export type TailsTree<T> = T extends DenormalizedTree ?
    {
        [K in keyof T]: T[K] extends {
            tails?: infer Tails
        } ? T[K] extends {
                projector: (props: ProjectorArgs<infer P, Tails>) => DialogSlots,
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
                    projector: (props: ProjectorArgs<infer P, Tails>) => DialogSlots,
                } ?
                K extends `${infer Head}${KeySeparator}${infer Rest}` ?
                    Head extends keyof Tails ?
                        Tails[Head] extends {
                                tails?: infer TT
                            } ? Tails[Head] extends {
                                    projector: (props: ProjectorArgs<infer P, TT>) => DialogSlots,
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

export type TailOptions<T, K extends TailKey<T>> = TailValue<T, K> extends never
    ? never
    : Parameters<TailValue<T, K>['projector']>[0] extends ProjectorArgs<infer Props, infer Tree>
        ? ProjectorArgs<Props, Tree>
        : never
