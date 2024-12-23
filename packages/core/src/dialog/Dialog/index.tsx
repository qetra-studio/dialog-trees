import {useTailsContext} from "@contexts/TailsContextProvider";
import {PropsWithChildren} from "react";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    defaultFullScreen?: boolean;
    hideFullScreenSwitch?: boolean;
    maxWidth?: string;
    slotProps?: Partial<{
        dialog: Record<string, any>;
        title: Record<string, any>;
        content: Record<string, any>;
    }>;
}

export default function Dialog({children}: PropsWithChildren<DialogProps>) {
    const {slots: {dialog: {Component}}} = useTailsContext()

}
