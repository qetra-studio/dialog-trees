import {useTailsConfigContext} from "@config";
import {useTailContext} from "@Dialog/tail/Context";


export default function DialogContent() {
    const {slots: {dialog: {content: {Component: Content}}}} = useTailsConfigContext()
    const {content} = useTailContext()
    return <Content>
        {content}
    </Content>
}
