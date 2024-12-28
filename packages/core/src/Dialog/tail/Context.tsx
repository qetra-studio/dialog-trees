import {useDialogContext} from "@Dialog/tail/Dialog";
import {DialogSlots, TailKey, TailOptions, TailType} from "@Dialog/types";
import {createContext, PropsWithChildren, useCallback, useContext} from "react";

export type TailContext = DialogSlots

const Context = createContext<TailContext>({} as TailContext);

export const useTailContext = () => useContext(Context);

type WithTail<T> = {
    tail: TailType<T>;
    props: TailOptions<T, ''>['props']
    tailKey: TailKey<T>
}

// Custom hook to encapsulate projector logic
function useProjectorValue<T>({tail, tailKey, props}: WithTail<T>)
{
    const {navigate} = useDialogContext<T>();
    return tail.projector({
        props,
        ctx: {
            navigate: useCallback((key, options) => {
                navigate(key && tailKey ? `${tailKey}.${key}` : key, // replace by absolute path if it is a relative root ('')
                    options);
            }, [navigate, tailKey])
        },
    });
}

export default function TailContextProvider<T>({
                                                              children,
                                                              ...props
                                                          }: PropsWithChildren<WithTail<T>>) {
    const value = useProjectorValue<T>(props)
    return <Context.Provider value={value}>{children}</Context.Provider>
}
