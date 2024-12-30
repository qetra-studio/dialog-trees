import {useTailsConfigContext} from "@config";
import {MouseEvent, PropsWithChildren} from "react";

export interface BreadcrumbProps {
    onClick?: (event: MouseEvent) => void;
}

interface Props {
    onClick?: (event: MouseEvent) => void;
}

export default function Breadcrumb({
                                       onClick,
                                       children
                                   }: PropsWithChildren<Props>) {
    const {
        slots: {
            breadcrumbs: {
                breadcrumb: {
                    Component: Breadcrumb
                }
            }
        }
    } = useTailsConfigContext()

    return <Breadcrumb onClick={onClick}>
        {children}
    </Breadcrumb>
}
