// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {
    Tail,
    TailKey,
    TailOptions,
    TailsDialog,
    TailsDialogProps,
    TailsTree,
    TailType,
    TailValue
} from "@tree-tails/core";
import {TailsContextProvider} from "@tree-tails/core/contexts";
import createTailsMuiConfig from "@tree-tails/mui/config";

import React, {StrictMode, useEffect, useState} from "react";
import counter from "./tails/mui/counter";
import threeLayers from "./tails/mui/threeLayers";
import title from "./tails/mui/title";
import titledCounter from "./tails/mui/titledCounter";

const muiConfig = createTailsMuiConfig()

const theme = createTheme();

const meta = {
    title: 'Tails/MUI Tails',
    component: TailsDialog,
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
        resetOnClose: {control: 'boolean', defaultValue: true},
    },
    args: {
        onClose: fn().mockName('onClose'),
        resetOnClose: true
    },
    decorators: [
        (Story, {args}) => {
            return <StrictMode>
                <ThemeProvider theme={theme}>
                    <TailsContextProvider {...muiConfig}>
                        <Story args={args}/>
                    </TailsContextProvider>
                </ThemeProvider>
            </StrictMode>
        },
        (Story, {args, hooks}) => {
            const [open, setOpen] = useState(false)
            return <>
                <Button onClick={() => setOpen(true)} variant='contained' color='primary' size='large'>
                    Open dialog
                </Button>
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
        },

    ]

} satisfies Meta<typeof TailsDialog>;

export default meta;

type Story<S> = StoryObj<typeof TailsDialog<S>>


export const TitleNodeDialog: Story<typeof title> = {
    name: 'Title Tail Dialog',
    args: {
        open: false,
        defaultFullScreen: false,
        hideFullScreenSwitch: false,
        tail: title,
        rootTailProps: {
            title: "Sample title tail",
            content: "Sample title tail content, can it be a lorem ipsum boilerplate? I honestly don't know but it does its thing, isn't? I guess so :D"
        },
        unmountable: true
    }
};

export const SingleNodeDialog: Story<typeof counter> = {
    name: 'Counter Tail Dialog',
    args: {
        open: false,
        defaultFullScreen: false,
        hideFullScreenSwitch: false,
        tail: counter,
        rootTailProps: {
            initNumber: 6
        },
        unmountable: true
    }
};

export const TwoLayersDeepDialog: Story<typeof titledCounter> = {
    name: '2 Layers deep dialog',
    args: {
        open: false,
        defaultFullScreen: false,
        hideFullScreenSwitch: false,
        tail: titledCounter,
        rootTailProps: {
            title: 'Title page of counter module!',
            content: "You can see stuff on the next page, aren't you?"
        }
    }
}

export const ThreeLayersDeepDialog: Story<typeof threeLayers> = {
    name: '3 Layers deep dialog?',
    args: {
        open: false,
        defaultFullScreen: false,
        hideFullScreenSwitch: false,
        tail: threeLayers,
        rootTailProps: {
            title: 'Title page of counter module!',
            content: "You can see stuff on the next page, aren't you?"
        },
        rootLabel: 'Root'
    }
}

