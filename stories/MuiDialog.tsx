import DreesMuiDialog from "@qetra-drees/mui/dialog/Dialog";
import React, {useState} from 'react';

import './button.css';
import {Button} from "./Button";

export interface ButtonProps {
    hideFullScreenSwitch?: true
    defaultFullScreen?: true;
}

/** Primary UI component for user interaction */
export const MuiDialog = ({
                              ...props
                          }: ButtonProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button label='Open dialog' onClick={() => setOpen(true)} primary size='large'/>
            <DreesMuiDialog
                maxWidth='md'
                open={open}
                onClose={() => setOpen(false)}
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
        </>
    );
};
