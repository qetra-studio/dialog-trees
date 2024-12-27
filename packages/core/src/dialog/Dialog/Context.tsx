import {TailKey} from "@dialog";
import {History, TailHistoryItem} from "@dialog/Dialog/types";
import {createContext, PropsWithChildren, useContext} from "react";

export interface DialogContext<T> {
    fullScreen: boolean;
    setFullscreen: (fullscreen: boolean) => void;
    close: () => void;
    history: History<T>
    navigate: <K extends TailKey<T>, >(item: TailHistoryItem<T, K>) => void;
}

const Context = createContext<DialogContext<any>>({} as DialogContext<any>);

export const useDialogContext = <T,>() => useContext(Context) as DialogContext<T>;

Context.displayName = "Tails - Dialog Context"

export function DialogContextProvider<T>({children, ...ctx}: PropsWithChildren<DialogContext<T>>) {
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
