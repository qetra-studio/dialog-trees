import {TailKey, TailOptions} from "@dialog";
import {ReactNode} from "react";

export interface TailHistoryItem<T, K extends TailKey<T>> {
    key: K,
    props: TailOptions<T, K>['props']
    label: ReactNode
    goBackLabel?: ReactNode
    breadcrumbLabel?: ReactNode
}

export type History<T> = TailHistoryItem<T, TailKey<T>>[]
