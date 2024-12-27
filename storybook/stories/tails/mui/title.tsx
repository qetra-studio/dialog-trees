import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Tail} from "@tree-tails/core/Dialog/types";
import React, {ReactNode} from "react";

export interface TitleOptions {
    title: ReactNode
    content: ReactNode
    actions?: ReactNode
}

const title = {
    projector: ({
                    props: {
                        title,
                        content,
                        actions
                    }
                }) => {

        return ({
            title: <Typography>{title}</Typography>,
            content: <Typography>{content}</Typography>,
            actions: <>{actions}<Button variant='contained'>Sample action</Button></>
        });
    },
    tails: {}
} as const satisfies Tail<TitleOptions>



export default title
