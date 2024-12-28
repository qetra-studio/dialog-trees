
import Dialog from "@Dialog/tail/Dialog";
import DialogActions from "@Dialog/tail/Actions";
import DialogContent from "@Dialog/tail/Content";
import TailContextProvider from "@Dialog/tail/Context";
import DialogTitle from "@Dialog/tail/Title";
import {
    NavigationFn,
    NavigationOptions, TailHistoryItem,
    TailKey,
    TailNavigationHistory,
    TailOptions,
    TailsTree,
    TailType,
    TailValue
} from "@Dialog/types";
import {lastIndexBy} from "@Dialog/utils";
import {Fragment, ReactNode, useCallback, useMemo, useState} from "react";

interface Props {
    unmountable?: boolean;
    open: boolean;
    onClose: () => void;
    defaultFullScreen?: boolean;
    hideFullScreenSwitch?: boolean;
    slotProps?: Partial<{
        dialog: Record<string, any>;
        title: Record<string, any>;
        content: Record<string, any>;
        actions: Record<string, any>;
    }>;
    resetOnClose?: boolean;
}


type WithTail<P> = {
    tail: TailType<P>;
    rootTailProps: TailOptions<P, ''>['props']
    rootLabel: ReactNode;
    rootGoBackLabel?: ReactNode;
    rootBreadcrumbLabel?: ReactNode
}

export type TailsDialogProps<P> = Props & WithTail<P>

const keySeparator = '.'


export default function TailsDialog<T>({
                                           slotProps,
                                           tail,
                                           unmountable,
                                           defaultFullScreen,
                                           rootTailProps,
                                           hideFullScreenSwitch,
                                           resetOnClose,
                                           rootGoBackLabel,
                                           rootBreadcrumbLabel,
                                           rootLabel,
                                           ...props
                                       }: Readonly<TailsDialogProps<T>>) {

    const [history, setHistory] = useState<TailNavigationHistory<T>>(() => [{
        key: '',
        props: rootTailProps,
        label: rootLabel,
        breadcrumbLabel: rootBreadcrumbLabel,
        goBackLabel: rootGoBackLabel
    }])

    const currentTail = useMemo(() => {
        const item = history[history.length - 1]
        if (!item.key) {
            return {
                tail,
                props: item.props,
                tailKey: item.key
            }
        }

        const {key, props} = item as TailHistoryItem<T, TailKey<T>>;

        const parts = key.split(keySeparator) as TailKey<T>[];
        const currentTail = parts.reduce((prev: TailValue<T, ''>, next) => {
            if (!prev.tails) {
                throw new Error();
            }
            const v = prev.tails as TailsTree<T>
            return v[next] as TailValue<T, typeof next>
        }, tail)
        return {
            tail: currentTail,
            props,
            tailKey: key
        }

    }, [history, tail, rootTailProps])

    const onClose = () => {
        if (resetOnClose) {
            setHistory(() => [{
                key: '',
                props: rootTailProps,
                label: rootLabel,
                breadcrumbLabel: rootBreadcrumbLabel,
                goBackLabel: rootGoBackLabel
            }])
        }
        return props.onClose()
    }

    const navigate: NavigationFn<T> = useCallback(<K extends TailKey<T>>(key: K, options: NavigationOptions<T, K>) => {
        const strategy = options.strategy
        switch (strategy) {
            case "return":
                setHistory(history => {
                    const index = lastIndexBy(history, x => x.key === key);
                    if (index === -1) {
                        throw new Error(`Last index of ${key} has not been found in history`);
                    }
                    const copy = history.slice(0, index + 1);
                    const item = copy[index];
                    if (options.props) {
                        item.props = {
                            ...(item.props ?? {}),
                            ...options.props
                        } // makes it possible to pass new props back
                    }
                    return copy
                })
                break;
            case "follow":
            case undefined:
            case null:
                setHistory(history => [...history, {...options, key}])
                break;
            default:
                throw new Error(`Unknown navigation strategy '${strategy}'`)

        }
    }, [])

    const isMounted = props.open || unmountable
    return isMounted ? <Dialog
        open={props.open}
        onClose={onClose}
        history={history}
        navigate={navigate}
        defaultFullScreen={defaultFullScreen}>
        <Fragment key={currentTail.tailKey}>
            <TailContextProvider key={currentTail.tailKey} {...currentTail}>
                <DialogTitle navigate={navigate} {...slotProps?.title} hideFullScreenSwitch={hideFullScreenSwitch}/>
                <DialogContent {...slotProps?.content}/>
                <DialogActions {...slotProps?.actions}/>
            </TailContextProvider>
        </Fragment>
    </Dialog> : null
}
