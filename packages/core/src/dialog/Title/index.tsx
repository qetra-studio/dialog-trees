import {useDialogContext} from "@contexts/DialogContext";
import {useTailsContext} from "@contexts/TailsContextProvider";
import {useTailsDialogNodeContext} from "@contexts/TailsDialogNodeProvider";
import {PropsWithChildren, ReactNode} from "react";

export interface DialogTitleProps {
    fullScreenSwitch: ReactNode;
    closeButton: ReactNode;
}

export default function DialogTitle() {
    const {
        slots:
            {
                dialog:
                    {
                        closeButton: {Component: CloseButton},
                        collapseButton: {Component: CollapseButton},
                        expandButton: {Component: ExpandButton},
                        title: {Component: Title}
                    }
            }
    } = useTailsContext()

    const {fullScreen, setFullscreen, close} = useDialogContext()
    const fullScreenSwitch = fullScreen
        ? <CollapseButton onClick={() => setFullscreen(false)}/>
        : <ExpandButton onClick={() => setFullscreen(true)}/>

    const closeButton = <CloseButton onClick={close}/>
    const {title} = useTailsDialogNodeContext()
    return <Title closeButton={closeButton} fullScreenSwitch={fullScreenSwitch}>
        {title}
    </Title>
}
