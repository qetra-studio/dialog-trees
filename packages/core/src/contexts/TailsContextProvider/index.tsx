import {DialogTitleProps} from "@dialog/Title";
import {createContext, FC, MouseEvent, PropsWithChildren, ReactNode, useContext, useMemo} from "react";
import {BreadcrumbProps} from "../../breadcrumbs/Breadcrumb";

export interface TailsContext {
    slots: {
        dialog: {
            Component: FC<PropsWithChildren<{open: boolean, onClose: () => void, fullScreen: boolean }>>,
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
                Component: FC<{ onClick: (event: MouseEvent<HTMLElement>) => void }>
            },
            expandButton: {
                Component: FC<{ onClick: (event: MouseEvent<HTMLElement>) => void }>
            },
            collapseButton: {
                Component: FC<{ onClick: (event: MouseEvent<HTMLElement>) => void }>
            },
            goBackButton: {
                Component: FC<{onClick: (event: MouseEvent<HTMLElement>) => void, label: ReactNode}>
            }
        },
        breadcrumbs: {
            Component: FC<PropsWithChildren<BreadcrumbProps>>,
            breadcrumb: {
                Component: FC<BreadcrumbProps>
            }
        }
    }
}

const Context = createContext<TailsContext>({} as TailsContext);

export const useTailsContext = () => useContext(Context);

export default function TailsContextProvider({children, ...ctx}: PropsWithChildren<TailsContext>) {
    const value = useMemo(() => ({...ctx}), [ctx])
    return <Context.Provider value={value}>{children}</Context.Provider>
}
