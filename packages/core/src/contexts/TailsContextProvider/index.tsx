
import {TailsDialogProps} from "@dialog/Tails";
import {DialogTitleProps} from "@dialog/Title";
import {MouseEvent, createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {BreadcrumbProps} from "../../Breadcrumb";

export interface TailsContext {
    slots: {
        dialog: {
            Component: FC<PropsWithChildren<TailsDialogProps>>,
            title: {
                Component: FC<PropsWithChildren<DialogTitleProps>>
            },
            content: {
                Component: FC<PropsWithChildren>
            },
            actions: {
                Component: FC<PropsWithChildren>
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
    const value = useMemo(() => ({...ctx}), [ctx])
    return <Context.Provider value={value}>{children}</Context.Provider>
}
