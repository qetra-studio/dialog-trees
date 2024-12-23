import TailsDialogContextProvider from "@contexts/DialogContext";
import {useTailsContext} from "@contexts/TailsContextProvider";
import DialogActions from "@dialog/Actions";
import DialogContent from "@dialog/Content";
import {DialogTailsTree} from "@dialog/Tails/types";
import DialogTitle from "@dialog/Title";

export interface TailsDialogProps {
    open: boolean;
    onClose: () => void;
    defaultFullScreen?: boolean;
    hideFullScreenSwitch?: boolean;
    slotProps?: Partial<{
        dialog: Record<string, any>;
        title: Record<string, any>;
        content: Record<string, any>;
        actions: Record<string, any>;
    }>;
}

type WithTails<T extends DialogTailsTree> = {
    tails: T;
}

export default function TailsDialog<T extends DialogTailsTree>({
                                                                   slotProps,
                                                                   tails,
                                                                   ...props
                                                               }: TailsDialogProps & WithTails<T>) {
    const {slots: {dialog: {Component: DialogComponent}}} = useTailsContext()
    const {Component: Tail} = tails.config;
    return <TailsDialogContextProvider close={props.onClose}>
        {props.open ? <DialogComponent  key='tai2l' open={props.open} onClose={props.onClose} >
            <Tail key='tail1'>
                <DialogTitle {...slotProps?.title}/>
                <DialogContent {...slotProps?.content}/>
                <DialogActions {...slotProps?.actions}/>
            </Tail>
        </DialogComponent> : null}
    </TailsDialogContextProvider>
}
