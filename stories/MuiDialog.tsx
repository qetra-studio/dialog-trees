import TailsMuiDialog from "@tree-tails/mui/dialog/Dialog";
import React from 'react';

export interface MuiDialogProps {
    hideFullScreenSwitch?: boolean;
    defaultFullScreen?: boolean;
    maxWidth: string;
    open: boolean;
    onClose:() => void;
}

/** Primary UI component for user interaction */
export const MuiDialog = ({
                              ...props
                          }: MuiDialogProps) => {
    return (
            <TailsMuiDialog
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
            />
    );
};
