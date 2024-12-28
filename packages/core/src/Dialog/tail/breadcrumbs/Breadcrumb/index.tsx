import {useTailsConfigContext} from "@config";
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
    }} = useTailsConfigContext()

    return <Breadcrumb onClick={onClick}/>
}
