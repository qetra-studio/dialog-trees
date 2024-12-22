// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import React, {useState} from "react";
import {Button} from "./Button";
import {MuiDialog} from "./MuiDialog";

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
        maxWidth: {options: ['sm', 'md', 'lg'], type: 'string', },
    },
    args: {
        onClose: fn().mockName('onClose')
    },
    decorators: [
        (Story, {args, hooks}) => {
            const [open, setOpen] = useState(false)
            return <>
                <Button label='Open dialog' onClick={() => setOpen(true)} primary size='large'/>
                <Story
                    args={{
                        ...args,
                        maxWidth: 'md',
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
