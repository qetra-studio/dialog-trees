import {useTailsContext} from "@contexts/TailsContextProvider";
import {useTailsDialogNodeContext} from "@contexts/TailsDialogNodeProvider";
import {useDialogContext} from "@dialog/Dialog";
import {ReactNode} from "react";

export interface DialogTitleProps {
    fullScreenSwitch: ReactNode;
    closeButton: ReactNode;
    goBackButton: ReactNode;
}

export default function DialogTitle({hideFullScreenSwitch, goBack}: {
    hideFullScreenSwitch?: boolean
    goBack: () => void
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
    } = useTailsContext()

    const {fullScreen, setFullscreen, close, history} = useDialogContext()
    const fullScreenSwitch = fullScreen
        ? <CollapseButton onClick={() => setFullscreen(false)}/>
        : <ExpandButton onClick={() => setFullscreen(true)}/>

    const closeButton = <CloseButton onClick={close}/>
    const {title} = useTailsDialogNodeContext()
    const lastHistoryItem = history.length > 1 ? history[history.length - 2] : null;
    const goBackButton = lastHistoryItem? <GoBackButton onClick={goBack} label={lastHistoryItem.goBackLabel ?? lastHistoryItem.label}/> : null
    return <Title closeButton={closeButton}
                  fullScreenSwitch={hideFullScreenSwitch ? null : fullScreenSwitch}
                  goBackButton={goBackButton}>
        {title}
    </Title>
}
