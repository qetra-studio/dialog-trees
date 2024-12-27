
import {useTailsConfigContext} from "@config";
import {useTailContext} from "@Dialog/tail/Context";
import {useDialogContext} from "@Dialog/tail/Dialog";
import {NavigationFn} from "@Dialog/types";
import {ReactNode} from "react";

export interface DialogTitleProps {
    fullScreenSwitch: ReactNode;
    closeButton: ReactNode;
    goBackButton: ReactNode;
}

export default function DialogTitle<T>({hideFullScreenSwitch, navigate}: {
    hideFullScreenSwitch?: boolean
    navigate: NavigationFn<T>
}) {
    const {
        slots:
            {
                dialog:
                    {
                        closeButton: {Component: CloseButton},
                        collapseButton: {Component: CollapseButton},
                        expandButton: {Component: ExpandButton},
                        title: {Component: Title},
                        goBackButton: {Component: GoBackButton}
                    }
            }
    } = useTailsConfigContext()

    const {fullScreen, setFullscreen, close, history} = useDialogContext<T>()
    const fullScreenSwitch = fullScreen
        ? <CollapseButton onClick={() => setFullscreen(false)}/>
        : <ExpandButton onClick={() => setFullscreen(true)}/>

    const closeButton = <CloseButton onClick={close}/>
    const {title} = useTailContext()
    const lastHistoryItem = history.length > 1 ? history[history.length - 2] : null;
    const goBackButton = lastHistoryItem ? <GoBackButton onClick={() => navigate(lastHistoryItem.key, {
        strategy: 'return'
    })} label={lastHistoryItem.goBackLabel ?? lastHistoryItem.label}/> : null
    return <Title closeButton={closeButton}
                  fullScreenSwitch={hideFullScreenSwitch ? null : fullScreenSwitch}
                  goBackButton={goBackButton}>
        {title}
    </Title>
}
