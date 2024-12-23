// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {TailsDialogProps} from "@tree-tails/core/dialog/Tails";
import TailsContextProvider from "@tree-tails/core/contexts/TailsContextProvider";
import {TailsContext} from "@tree-tails/core/contexts/TailsContextProvider";
import {DialogTitleProps} from "@tree-tails/core/dialog/Title";
import React, {PropsWithChildren, useState} from "react";
import {Button} from "./Button";
import {MuiDialog} from "./MuiDialog";
import Dialog from "@mui/material/Dialog";


const muiConfig: TailsContext = {
    slots: {
        dialog: {
            Component: ({children, slotProps, open, onClose}: PropsWithChildren<TailsDialogProps>) => {
                return <Dialog
                    fullWidth
                    maxWidth='md'
                    open={open}
                    fullScreen={false}
                    onClose={onClose}
                    {...slotProps?.dialog}
                >
                    {children}
                </Dialog>
            },
            actions: {
                Component: ({children}: PropsWithChildren) => {
                    return <DialogActions sx={{
                        borderTop: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}>{children}</DialogActions>
                }
            },
            content: {
                Component: ({children}: PropsWithChildren) => {
                    return <DialogContent
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.default,
                        }}
                        style={{
                            paddingTop: 16, // weird thing about override of dialog content pt on mui side, the best solution is just to override mui override style in-place :/
                        }}>{children}</DialogContent>
                }
            },
            title: {
                Component: ({children}: PropsWithChildren<DialogTitleProps>) => {
                    return <DialogTitle sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}>

                        {children}
                    </DialogTitle>
                }
            },
            closeButton: {
                Component: () => <></>
            },
            collapseButton: {
                Component: () => <></>
            },
            expandButton: {
                Component: () => <></>
            }
        },
    }
}

const meta = {
    title: 'Mui/Dialog',
    component: MuiDialog,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        hideFullScreenSwitch: {control: 'boolean'},
        defaultFullScreen: {control: 'boolean'},
        open: {control: false, type: 'boolean'},
        maxWidth: {options: ['sm', 'md', 'lg'], type: 'string',},
    },
    args: {
        onClose: fn().mockName('onClose')
    },
    decorators: [
        (Story, {args}) => {
            return <TailsContextProvider slots={muiConfig.slots}>
                <Story args={args}/>
            </TailsContextProvider>
        },
        (Story, {args, hooks}) => {
            const [open, setOpen] = useState(false)
            return <>
                <Button label='Open dialog' onClick={() => setOpen(true)} primary size='large'/>

                <Story
                    args={{
                        ...args,
                        open,
                        onClose: () => {
                            args?.onClose()
                            setOpen(false);
                        },
                    }}
                />
            </>
        }
    ]

} satisfies Meta<typeof MuiDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleNodeDialog: Story = {
    name: 'Single Node Dialog',
    args: {
        open: false,
        maxWidth: 'md',
        defaultFullScreen: false,
        hideFullScreenSwitch: false,
    }
};
