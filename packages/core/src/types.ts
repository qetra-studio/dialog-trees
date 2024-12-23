import {ReactNode} from "react";

export interface DialogSlots  {
    title: ReactNode;
    content: ReactNode;
    actions?: ReactNode;
}
