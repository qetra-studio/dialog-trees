import {useTailsConfigContext} from "@config";
import {Breadcrumb} from "@Dialog/tail/breadcrumbs";
import {useDialogContext} from "@Dialog/tail/Dialog";
import {useMemo} from "react";


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
    const breadcrumbs = useMemo(() => {
        return history.map((x, itemIndex) => ({
            label: x.breadcrumbLabel ?? x.label,
            onClick: () => navigate(x.key, {
                strategy: 'return',
                filters: (_, index) => {
                    return index === itemIndex;
                }
            }),
            key: x.key
        }))
    }, [history, navigate])

    return <Breadcrumbs>
        {breadcrumbs.map(x => <Breadcrumb onClick={x.onClick} key={x.key}>{x.label}</Breadcrumb>)}
    </Breadcrumbs>

}
