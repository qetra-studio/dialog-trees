import type { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

export default function Breadcrumb({
                               value,
                               onClick,
                               disabled,
                           }: {
    value: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <Typography
            component="span"
            sx={
                !disabled
                    ? {
                        '&:hover': {
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        },
                    }
                    : {}
            }
            onClick={!disabled ? onClick : undefined}
        >
            {value}
        </Typography>
    );
}
