import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";

export interface DialogContext {
    fullScreen: boolean;
    setFullscreen: (fullscreen: boolean) => void;
    close: () => void;
}

const Context = createContext<DialogContext>({} as DialogContext);

export const useDialogContext = () => useContext(Context);

interface DialogContextProviderProps {
    defaultFullScreen?: boolean;
    close: () => void;
}

export default function DialogContextProvider({ children, defaultFullScreen, close }: PropsWithChildren<DialogContextProviderProps>) {
    const [fullScreen, setFullscreen] = useState(() => defaultFullScreen ?? false);
    const value = useMemo(() => ({
        setFullscreen,
        fullScreen,
        close
    }) satisfies DialogContext, [fullScreen])
    return <Context.Provider value={value}>{children}</Context.Provider>
}
