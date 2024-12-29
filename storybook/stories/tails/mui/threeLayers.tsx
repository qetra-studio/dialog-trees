import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Tail, TailKey, TailValue} from "@tree-tails/core/Dialog/types";
import React from "react";
import counter from "./counter";
import {TitleOptions} from "./title";
import titledCounter from "./titledCounter";

const tails = {
    counterLeft: counter,
    titledCounter
}

const threeLayers: Tail<TitleOptions, typeof tails> = {
    projector: ({
                    title,
                    content
                }, {navigate}) => {

        const onNavigateClick = () => navigate('titledCounter', {
            props: {
                title: 'Second title page!',
                content: <><Typography>Cool content, you see? That button will throw you to the root again (but with
                    other content)</Typography>
                    <Button variant='contained' onClick={() => navigate('', {
                        props: {
                            title: "Root again? really?",
                            content: "you are in the root again? wow!"
                        },
                        label: 'root..'
                    })}>
                        Navigate to the root!!!
                    </Button>

                </>,
                actions: <Button variant='contained' onClick={() => navigate('titledCounter.counter', {
                    props: {
                        initNumber: 8,
                        title: "and that is a third layer - cool, isn't it?"
                    },
                    label: 'Third layer'
                })}>
                    Navigate further!
                </Button>
            },
            label: 'Second title'
        });

        const onNavigateLeftClick = () => navigate('counterLeft', {
            props: {
                title: 'Left counter',
                initNumber: 8,
            },
            label: 'Left counter'
        });
        return ({
            title: <Stack direction="row" gap={1} alignItems='center'>
                <Typography component='span'>{title}</Typography><Button variant='contained'
                                                                         onClick={onNavigateLeftClick}>Go
                left?</Button></Stack>,
            content: <Typography>{content} <Button variant='contained' onClick={onNavigateLeftClick}>Or go left from
                here?</Button></Typography>,
            actions: <>
                <Button variant='contained' onClick={onNavigateLeftClick}>Or here?</Button>
                <Button variant='text' onClick={onNavigateClick}>Navigate to counter title</Button>
            </>
        });
    },
    tails
}


type Keys = TailKey<typeof threeLayers>

type Value = TailValue<typeof threeLayers, 'titledCounter.counter'>

export default threeLayers;
