import TailsDialogNodeContextProvider from "@contexts/TailsDialogNodeProvider";
import TailsDialog, {TailsDialogProps} from "@dialog/Tails";
import {DialogSlots} from "@types";
import {PropsWithChildren, useMemo} from "react";

export type DialogProps = TailsDialogProps & DialogSlots

export default function Dialog({title, actions, content, ...props}: DialogProps) {
    const tails = useMemo(() => ({
        config: {
            Component: ({children}: PropsWithChildren) => <TailsDialogNodeContextProvider
                key='single-node'
                title={title}
                content={content}
                actions={actions}>
                {children}
            </TailsDialogNodeContextProvider>
        }
    }), [title, actions, content])
    return <TailsDialog tails={tails} {...props}/>
}
