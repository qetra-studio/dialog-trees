
import TailsDialog from "@tree-tails/core/dialog/Tails";
import {createTail} from "@tree-tails/core/tails/create-tail";
import React, {useEffect, useState} from 'react';

export interface MuiDialogProps {
    hideFullScreenSwitch?: boolean;
    defaultFullScreen?: boolean;
    maxWidth: string;
    open: boolean;
    onClose: () => void;
}

const tail = createTail({
    projector: () => {
        const [value, setValue] = useState<number>(0)
        useEffect(() => {
            const interval = setInterval(() => setValue(v => v + 1), 1000)
            return () => clearInterval(interval)
        }, []);
        return ({
            title: <>title</>,
            content: <>{value}</>,
        });
    }
})

/** Primary UI component for user interaction */
export const MuiDialog = ({
                              ...props
                          }: MuiDialogProps) => {
    return (<>

                <TailsDialog tails={{
                    config: tail
                }} {...props} />

            {/*<TailsMuiDialog
                defaultNode='default'
                nodes={{
                    'default': {
                        label: 'dialog node',
                        nodes: {},
                        dialog: {
                            title: 'Default dialog node title',
                            content: 'Default dialog node content',
                            actions: 'asd'
                        }
                    }
                }}
                {...props}
            />*/}
        </>

    );
};
