import Breadcrumb from "@breadcrumbs/Breadcrumb";
import {useTailsContext, useTailsDialogNodeContext} from "@contexts";
import {TailKey, useDialogContext} from "@dialog";
import {TailHistoryItem} from "@dialog/Dialog/types";

export interface BreadcrumbsProps {
}


export default function Breadcrumbs<T>() {
    const {
        slots: {
            breadcrumbs: {
                Component: Breadcrumbs
            }
        }
    } = useTailsContext()

    const {history, navigate} = useDialogContext<T>()

    return <Breadcrumbs>
    </Breadcrumbs>

}
