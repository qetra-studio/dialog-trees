import {useTailsConfigContext} from "@config";
import {Breadcrumbs} from "@Dialog/tail/breadcrumbs";
import {useTailContext} from "@Dialog/tail/Context";


export default function DialogContent() {
    const {slots: {dialog: {content: {Component: Content}},
     breadcrumbs: {
        Component: BreadcrumbsSet,
         breadcrumb: {Component: BreadCrumb}
     }}} = useTailsConfigContext()
    const {content} = useTailContext()
    return <Content>
        {content}
    </Content>
}
