import {useTailsContext} from "@contexts/TailsContextProvider";
import {useTailsDialogNodeContext} from "@contexts/TailsDialogNodeProvider";

export default function DialogContent() {
    const {slots: {dialog: {content: {Component: Content}}}} = useTailsContext()
    const {content} = useTailsDialogNodeContext()
    return <Content>
        {content}
    </Content>
}
