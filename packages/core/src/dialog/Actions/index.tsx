import {useTailsContext} from "@contexts/TailsContextProvider";
import {useTailsDialogNodeContext} from "@contexts/TailsDialogNodeProvider";


export default function DialogActions() {
    const {slots: {dialog: {actions: {Component: Actions}}}} = useTailsContext()
    const {actions} = useTailsDialogNodeContext()
    return <Actions>
        {actions}
    </Actions>
}
