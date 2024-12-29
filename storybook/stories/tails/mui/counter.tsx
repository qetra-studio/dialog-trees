import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Tail} from "@tree-tails/core/Dialog/types";
import React, {useEffect, useState} from "react";

interface Options {
    initNumber: number
    title?: string
}

const counter = {
    projector: ({
                        initNumber,
                        title
                }) => {
        const [value, setValue] = useState<number>(initNumber)
        useEffect(() => {
            const interval = setInterval(() => setValue(v => {
                if (v === 9) {
                    return initNumber;
                }
                return v + 1;
            }), 1000)
            return () => clearInterval(interval)
        }, []);
        return ({
            title: <>Counter tail{title ? ` - ${title}` : null}</>,
            content: <Typography>Counter value: {value}</Typography>,
            actions: <Button variant='contained' onClick={() => setValue(0)}>Reset counter</Button>
        });
    },
    tails: {}
} as const satisfies Tail<Options>

export default counter
