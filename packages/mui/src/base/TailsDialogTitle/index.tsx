import Close from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {Stack, SxProps} from "@mui/system";
import type {ReactNode} from "react";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

export interface TailsDialogTitleProps {
    title: ReactNode;
    onClose: () => void;
    childRight?: ReactNode;
    childLeft?: ReactNode;
    fullScreen: boolean;
    onFullScreenSwitch: (v: boolean) => void;
    hideFullScreenSwitch?: true;
    sx?: SxProps;
}

export default function TailsDialogTitle({
                                             title,
                                             onClose,
                                             childRight,
                                             childLeft,
                                             onFullScreenSwitch,
                                             fullScreen,
                                             hideFullScreenSwitch,
                                             sx,
                                         }: TailsDialogTitleProps) {
    const onFullScreenIconClick = () => onFullScreenSwitch(!fullScreen);
    const fullScreenSwitch = <IconButton onClick={onFullScreenIconClick}>{fullScreen ? <UnfoldLessIcon sx={{
        rotate: '45deg'
    }}/> : <UnfoldMoreIcon sx={{
        rotate: '45deg'
    }}/>}</IconButton>;
    return (
        <DialogTitle
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                ...sx,
            }}
        >
            <Stack direction="row" width="100%" alignItems="center" gap={1}>
                <IconButton edge="start" onClick={onClose} aria-label="close" data-e2e="close-dialog">
                    <Close/>
                </IconButton>
                <Typography variant="h6" component="span" color="text.primary">
                    {title}
                </Typography>
                {childLeft}
                <Stack flexGrow={1} direction="row-reverse" spacing={1}>
                    {!hideFullScreenSwitch ? fullScreenSwitch : null}
                    {childRight}
                </Stack>
            </Stack>
        </DialogTitle>
    );
}
