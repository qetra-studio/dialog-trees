import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Tail} from "@tree-tails/core/Dialog/types";
import React, {useRef} from "react";
import counter from "./counter";
import {TitleOptions} from "./title";

const stateSetter: Tail<{
    onClick: (value: number) => void
}> = {
    projector: ({onClick}) => {
        const number = useRef(new Date().getMilliseconds() % 10)
        return ({
            title: 'Set state!',
            content: <Typography>Action will return {number.current} to previous tail</Typography>,
            actions: <>
                <Button variant='contained' onClick={() => onClick(number.current)}>Set counter initial number
                    to {number.current}</Button>
            </>
        });
    },
    tails: {}
}

const tails = {
    counter,
    stateSetter
} as const;

const passState: Tail<TitleOptions & { initNumber?: number }, typeof tails> = {
    projector: (
        props,
        {navigate}) => {
        const {
            title,
            content,
            actions,
            initNumber = undefined
        } = props;
        const onSetStateClick = () => navigate('stateSetter', {
            props: {
                onClick: value => {
                    navigate('', {
                        props: {
                            ...props,
                            initNumber: value
                        },
                        strategy: 'return'
                    });
                },
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
