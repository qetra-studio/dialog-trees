import {createContext, PropsWithChildren, useContext} from "react";
import {DialogSlots} from "@types";

export type TailsDialogNodeContext = DialogSlots

const Context = createContext<TailsDialogNodeContext>({} as TailsDialogNodeContext);

export const useTailsDialogNodeContext = () => useContext(Context);

export default function TailsDialogNodeContextProvider({children, ...ctx}: PropsWithChildren<TailsDialogNodeContext>) {
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
