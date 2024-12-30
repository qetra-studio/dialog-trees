import {BreadcrumbProps} from "@Dialog/tail/breadcrumbs";
import {DialogTitleProps} from "@Dialog/tail/Title";
import {createContext, FC, MouseEvent, PropsWithChildren, ReactNode, useContext, useMemo} from "react";

export interface TailsConfig {
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
            Component: FC<PropsWithChildren>,
            breadcrumb: {
                Component: FC<PropsWithChildren<BreadcrumbProps>>
            }
        }
    }
}

const Context = createContext<TailsConfig>({} as TailsConfig);

export const useTailsConfigContext = () => useContext(Context);

export default function TailsConfigProvider({children, ...ctx}: PropsWithChildren<TailsConfig>) {
    const value = useMemo(() => ({...ctx}), [ctx])
    return <Context.Provider value={value}>{children}</Context.Provider>
}
