import TailsDialogNodeContextProvider from "@contexts/TailsDialogNodeProvider";
import {Dialog, GoBackFn, TailKey, TailOptions, TailsTree, TailType, TailValue} from "@dialog";
import DialogActions from "@dialog/Actions";
import DialogContent from "@dialog/Content";
import {History, TailHistoryItem} from "@dialog/Dialog/types";
import DialogTitle from "@dialog/Title";
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

    const [history, setHistory] = useState<History<T>>(() => [{
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
        if(resetOnClose) {
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

    const navigate = useCallback(<K extends TailKey<T>,>(item: TailHistoryItem<T, K>) => {
        setHistory(history => [...history, {...item}])
    }, [])

    const goBack  = useCallback(((args) => {
        setHistory(history => {
            const copy =  history.slice(0, -1)
            if(args?.props) {
                const lastItem = copy[copy.length - 1];
                lastItem.props = {
                    ...(lastItem.props ?? {}),
                    ...args.props
                } // makes it possible to pass new props back
            }
            return copy;
        })
    }) as GoBackFn, [])

    const isMounted = props.open || unmountable
    return isMounted ? <Dialog
        open={props.open}
        onClose={onClose}
        history={history}
        defaultFullScreen={defaultFullScreen}>
        <Fragment  key={currentTail.tailKey}>
        <TailsDialogNodeContextProvider key={currentTail.tailKey} {...currentTail} navigate={navigate} goBack={goBack}>
            <DialogTitle goBack={goBack} {...slotProps?.title} hideFullScreenSwitch={hideFullScreenSwitch}/>
            <DialogContent {...slotProps?.content}/>
            <DialogActions {...slotProps?.actions}/>
        </TailsDialogNodeContextProvider>
        </Fragment>
    </Dialog> : null
}
