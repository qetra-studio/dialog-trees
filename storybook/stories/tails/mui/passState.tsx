import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Tail} from "@tree-tails/core";
import React, {useRef, useState} from "react";
import counter from "./counter";
import {TitleOptions} from "./title";

const stateSetter: Tail<{
    onClick: (value: number) => void
}> = {
    projector: ({
                    props: {
                        onClick
                    }
                }) => {
        const number = useRef(new Date().getMilliseconds() % 10)
        return ({
            title: 'Set state!',
            content: <Typography>Action will return {number.current} to previous tail</Typography>,
            actions: <>
                <Button variant='contained' onClick={() => onClick(number.current)}>Set counter initial number to {number.current}</Button>
            </>
        });
    },
    tails: {}
}

const tails = {
    counter,
    stateSetter
} as const;

const passState: Tail<TitleOptions & {initNumber?: number}, typeof tails> = {
    projector: ({
                    props: {
                        title,
                        content,
                        actions,
                        initNumber = undefined
                    },
                    ctx: {
                        navigate,
                        goBack
                    }
                }) => {

        const onSetStateClick = () => navigate('stateSetter', {
            props: {
                onClick: value => {
                    goBack({
                        props: {
                            initNumber: value
                        }
                    });
                }
            },
            label: 'counter'
        });
        const onNavigateClick = () => navigate('counter', {
            props: {
                initNumber: initNumber ?? 2
            },
            label: 'counter'
        });
        return ({
            title: <Typography>{title}</Typography>,
            content: <><Typography>{content}</Typography>
                <Button variant='contained' onClick={onSetStateClick}>Provide new random number to counter</Button>
            </>,
            actions: <>
                {actions}
                <Button variant='contained' onClick={onNavigateClick}>Navigate to counter</Button>
            </>
        });
    },
    tails
}

export default passState;
