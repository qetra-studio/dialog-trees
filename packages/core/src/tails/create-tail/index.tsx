
import TailsDialogNodeContextProvider from "@contexts/TailsDialogNodeProvider";
import {FC, PropsWithChildren} from "react";
import {DialogSlots} from "@types";


type Options<P = {}> = {
    projector: (props: P) => DialogSlots
}

export type TailConfig<P = {}> = {
    Component: FC<PropsWithChildren<P>>
}


export function createTail<P = {}>({
                                       projector
                                   }: Options<P>): TailConfig<P> {
    return {
        Component: ({children, ...props}: PropsWithChildren<P>) => {
            const p = projector(props as P);
            console.log(p)
            return <TailsDialogNodeContextProvider {...p}>
                {children}
            </TailsDialogNodeContextProvider>
        }
    }
}
