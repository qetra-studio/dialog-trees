import {useTailsContext} from "@contexts";
import {MouseEvent} from "react";

export interface BreadcrumbProps {
    onClick?: (event: MouseEvent) => void;
}

interface Props {
    onClick?: (event: MouseEvent) => void;
}

export default function Breadcrumb({
    onClick
                                   }: Props) {
    const {slots: {
        breadcrumbs: {
            breadcrumb: {
                Component: Breadcrumb
            }
        }
    }} = useTailsContext()

    return <Breadcrumb onClick={onClick}/>
}
