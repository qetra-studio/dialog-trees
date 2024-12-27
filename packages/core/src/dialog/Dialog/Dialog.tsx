import {useTailsContext} from "@contexts/TailsContextProvider";
import {DialogContextProvider} from "@dialog";
import {DialogContext} from "@dialog/Dialog/Context";
import {History} from "@dialog/Dialog/types";
import React, {PropsWithChildren, useMemo, useState} from "react";

export interface DialogProps<T> {
    onClose: () => void;
    defaultFullScreen?: boolean;
    open: boolean;
    history: History<T>
}

export default function Dialog<T>({
                                      children,
                                      defaultFullScreen,
                                      onClose,
                                      open,
                                      history
                                  }: PropsWithChildren<DialogProps<T>>) {
    const {slots: {dialog: {Component: DialogComponent}}} = useTailsContext()
    const [fullScreen, setFullscreen] = useState(() => defaultFullScreen ?? false);
    const ctx = useMemo(() => ({
        close: onClose,
        fullScreen,
        setFullscreen,
        history
    }) satisfies DialogContext<T>, [onClose, fullScreen, history])
    return <DialogContextProvider {...ctx}>
        <DialogComponent open={open} onClose={onClose} fullScreen={fullScreen}>
            {children}
        </DialogComponent>
    </DialogContextProvider>
}
