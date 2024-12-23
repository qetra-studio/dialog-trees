import {useDialogContext} from "@contexts/DialogContext";
import {useTailsContext} from "@contexts/TailsContextProvider";
import {PropsWithChildren, ReactNode} from "react";

export interface DialogTitleSlotProps {
    fullScreenSwitch: ReactNode;
    closeButton: ReactNode;
}

export default function DialogTitleSlot({children}: PropsWithChildren<{}>) {
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
    return <Title closeButton={closeButton} fullScreenSwitch={fullScreenSwitch}>
        {children}
    </Title>
}
