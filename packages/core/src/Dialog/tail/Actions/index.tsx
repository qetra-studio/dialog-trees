import {useTailsConfigContext} from "@config";
import {useTailContext} from "@Dialog/tail/Context";


export default function DialogActions() {
    const {slots: {dialog: {actions: {Component: Actions}}}} = useTailsConfigContext()
    const {actions} = useTailContext()
    return <Actions>
        {actions}
    </Actions>
}
