import {useDialogContext} from "@contexts/DialogContext";
import {useTailsContext} from "@contexts/TailsContextProvider";
import {type} from "node:os";
import {PropsWithChildren, ReactNode} from "react";


export interface DialogTitleProps {

}

const createTailsNode = (...) => <...>

export default function DialogTitle({children}: PropsWithChildren<DialogTitleProps>) {
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

const asd = {
    defaultNode: (onSubmit: () => void) => typeof TailsNode,
    nextNode: () => typeof TailsNode
}

function DialogNode1233({children}: PropsWithChildren<DialogTitleProps>) {
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
    return <TailsNode title={} content={} actions={}/>
}
