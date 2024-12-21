import type { PropsWithChildren, ReactNode } from 'react';
import { useState } from 'react';

import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import type { DialogContentProps } from '@mui/material/DialogContent';
import DialogContent from '@mui/material/DialogContent';
import DreesMuiDialogTitle, {DreesDialogTitleProps} from "@base/DreesDialogTitle";


type Slots = {
    dialog: Omit<DialogProps, 'open'> & Record<string, any>;
    title: Pick<DreesDialogTitleProps, 'childRight' | 'childLeft'> & Record<string, any>;
    content: DialogContentProps & Record<string, any>;
};

export interface DreesDialogProps {
    title: ReactNode;
    open: boolean;
    onClose: () => void;
    defaultFullScreen?: true;
    actions?: ReactNode;
    hideFullScreenSwitch?: true;
    maxWidth?: DialogProps['maxWidth'];
    slotProps?: Partial<Slots>;
}

export default function DreesDialog({
                                        title,
                                        defaultFullScreen,
                                        open,
                                        onClose,
                                        actions,
                                        hideFullScreenSwitch,
                                        slotProps,
                                        maxWidth,
                                        children,
                                        ...props
                                    }: PropsWithChildren<DreesDialogProps>) {
    const [fullScreen, setFullScreen] = useState<boolean>(() => defaultFullScreen ?? false);
    return (
        <Dialog
            fullWidth
            maxWidth={maxWidth}
            open={open}
            fullScreen={fullScreen}
            onClose={onClose}
            {...props}
            {...slotProps?.dialog}
        >
            <DreesMuiDialogTitle
                title={title}
                onClose={onClose}
                fullScreen={fullScreen}
                onFullScreenSwitch={setFullScreen}
                hideFullScreenSwitch={hideFullScreenSwitch}
                {...slotProps?.title}
            />
            <DialogContent
                {...slotProps?.content}
                sx={{
                    backgroundColor: (theme) => theme.palette.background.default,
                    ...slotProps?.content?.sx,
                }}
                style={{
                    paddingTop: 16, // weird thing about override of dialog content pt on mui side, the best solution is just to override mui override style in-place :/
                }}
            >
                {children}
            </DialogContent>
            {actions ? (
                <DialogActions
                    sx={{
                        borderTop: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    {actions}
                </DialogActions>
            ) : null}
        </Dialog>
    );
}
