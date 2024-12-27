
import {useTailsConfigContext} from "@config";
import {DialogContext, DialogContextProvider} from "@Dialog/tail/Dialog/Context";
import {NavigationFn, TailNavigationHistory} from "@Dialog/types";
import React, {PropsWithChildren, useMemo, useState} from "react";

export interface DialogProps<T> {
    onClose: () => void;
    defaultFullScreen?: boolean;
    open: boolean;
    history: TailNavigationHistory<T>
    navigate: NavigationFn<T>
}

export default function Dialog<T>({
                                      children,
                                      defaultFullScreen,
                                      onClose,
                                      open,
                                      history,
                                      navigate
                                  }: PropsWithChildren<DialogProps<T>>) {
    const {slots: {dialog: {Component: DialogComponent}}} = useTailsConfigContext()
    const [fullScreen, setFullscreen] = useState(() => defaultFullScreen ?? false);
    const ctx = useMemo(() => ({
        close: onClose,
        fullScreen,
        setFullscreen,
        history,
        navigate
    }) satisfies DialogContext<T>, [onClose, fullScreen, history, navigate])
    return <DialogContextProvider {...ctx}>
        <DialogComponent open={open} onClose={onClose} fullScreen={fullScreen}>
            {children}
        </DialogComponent>
    </DialogContextProvider>
}
