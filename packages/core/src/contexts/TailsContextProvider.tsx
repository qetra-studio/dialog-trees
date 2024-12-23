import {DialogActionsProps} from "@dialog/Actions";
import {DialogContentProps} from "@dialog/Content";
import {DialogProps} from "@dialog/Dialog";
import {DialogTitleSlotProps} from "@dialog/Title/Slot";
import {MouseEvent, createContext, FC, PropsWithChildren, useContext} from "react";
import {BreadcrumbProps} from "../Breadcrumb";

export interface TailsContext {
    slots: {
        dialog: {
            Component: FC<PropsWithChildren<DialogProps>>,
            title: {
                Component: FC<PropsWithChildren<DialogTitleSlotProps>>
            },
            content: {
                Component: FC<PropsWithChildren<DialogContentProps>>
            },
            actions: {
                Component: FC<PropsWithChildren<DialogActionsProps>>
            }
            closeButton: {
                Component: FC<{onClick: (event: MouseEvent<HTMLElement>) => void}>
            },
            expandButton: {
                Component: FC<{onClick: (event: MouseEvent<HTMLElement>) => void}>
            },
            collapseButton: {
                Component: FC<{onClick: (event: MouseEvent<HTMLElement>) => void}>
            }
        },
        breadcrumb: {
            Component: FC<PropsWithChildren<BreadcrumbProps>>,
        }
    }
}

const Context = createContext<TailsContext>({} as TailsContext);

export const useTailsContext = () => useContext(Context);

export default function TailsContextProvider({ children, ...ctx }: PropsWithChildren<TailsContext>) {
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
