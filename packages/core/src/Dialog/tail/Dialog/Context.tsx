import {NavigationFn, TailNavigationHistory} from "@Dialog/types";
import {createContext, PropsWithChildren, useContext} from "react";

export interface DialogContext<T> {
    fullScreen: boolean;
    setFullscreen: (fullscreen: boolean) => void;
    close: () => void;
    history: TailNavigationHistory<T>
    navigate: NavigationFn<T>
}

const Context = createContext<DialogContext<any>>({} as DialogContext<any>);

export const useDialogContext = <T, >() => useContext(Context) as DialogContext<T>;

Context.displayName = "Tails - Dialog Context"

export function DialogContextProvider<T>({children, ...ctx}: PropsWithChildren<DialogContext<T>>) {
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
