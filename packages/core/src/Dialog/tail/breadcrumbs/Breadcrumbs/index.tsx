import {useTailsConfigContext} from "@config";
import {useDialogContext} from "@Dialog/tail/Dialog";


export interface BreadcrumbsProps {
}


export default function Breadcrumbs<T>() {
    const {
        slots: {
            breadcrumbs: {
                Component: Breadcrumbs
            }
        }
    } = useTailsConfigContext()

    const {history, navigate} = useDialogContext<T>()

    return <Breadcrumbs>
    </Breadcrumbs>

}
