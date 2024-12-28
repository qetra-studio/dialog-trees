import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import counter from "./counter";
import {TitleOptions} from "./title";
import {Tail} from "@tree-tails/core/Dialog/types";

const tails = {
    counter
}

const titledCounter: Tail<TitleOptions, typeof tails> = {
    projector: ({
                    props: {
                        title,
                        content,
                        actions
                    },
                    ctx: {
                        navigate
                    }
                }) => {
        const onNavigateClick = () => navigate('counter', {
            props: {
                initNumber: 3
            },
            label: 'counter'
        });
        return ({
            title: <Typography>{title}</Typography>,
            content: <Typography>{content}</Typography>,
            actions: <>
                {actions}
                <Button variant='contained' onClick={onNavigateClick}>Navigate to counter</Button>
            </>
        });
    },
    tails
}

export default titledCounter;
