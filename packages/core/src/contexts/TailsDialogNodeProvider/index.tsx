import {GoBackFn, TailKey, TailOptions, TailType} from "@dialog";
import {TailHistoryItem} from "@dialog/Dialog/types";
import {DialogSlots} from "@types";
import {createContext, PropsWithChildren, useCallback, useContext} from "react";

export type TailContext = DialogSlots

const Context = createContext<TailContext>({} as TailContext);

export const useTailsDialogNodeContext = () => useContext(Context);

type WithTail<T> = {
    tail: TailType<T>;
    props: TailOptions<T, ''>['props']
    tailKey: TailKey<T>
    navigate: <K extends TailKey<T>, >(item: TailHistoryItem<T, K>) => void;
    goBack: GoBackFn
}

// Custom hook to encapsulate projector logic
function useProjectorValue<T>({tail, tailKey, navigate: parentNavigate, props, goBack}: WithTail<T>) {
    return tail.projector({
        props,
        ctx: {
            navigate: useCallback((key, {props: targetProps, ...item}) => {
                parentNavigate({
                    ...item,
                    key: key && tailKey ? `${tailKey}.${key}` : key,
                    props: targetProps,
                });
            }, [parentNavigate, tailKey]),
            goBack
        },
    });
}

export default function TailsDialogNodeContextProvider<T>({
                                                              children,
                                                              ...props
                                                          }: PropsWithChildren<WithTail<T>>) {
    const value = useProjectorValue<T>(props)
    return <Context.Provider value={value}>{children}</Context.Provider>
}
