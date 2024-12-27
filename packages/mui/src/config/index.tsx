import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Close from "@mui/icons-material/Close";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {DialogTitleProps, useDialogContext} from "@tree-tails/core/dialog";
import {TailsContext} from "@tree-tails/core/contexts";
import React, {PropsWithChildren} from "react";


const backIcon = <ArrowBackIosNewIcon/>;

export default function createTailsMuiConfig(): TailsContext {
    return {
        slots: {
            dialog: {
                Component: (props) => {
                    const {children, open, onClose, fullScreen} = props
                    return <Dialog
                        fullWidth
                        maxWidth='md'
                        open={open}
                        fullScreen={fullScreen}
                        onClose={onClose}
                    >
                        {children}
                    </Dialog>
                },
                actions: {
                    Component: ({children}: PropsWithChildren) => {
                        return children ? <DialogActions sx={{
                            borderTop: 1,
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                        }}>{children}</DialogActions> : null
                    }
                },
                content: {
                    Component: ({children}: PropsWithChildren) => {
                        return <DialogContent
                            sx={{
                                backgroundColor: (theme) => theme.palette.background.default,
                            }}
                            style={{
                                paddingTop: 16, // weird thing about override of dialog content pt on mui side, the best solution is just to override mui override style in-place :/
                            }}>{children}</DialogContent>
                    }
                },
                title: {
                    Component: ({
                                    children,
                                    closeButton,
                                    fullScreenSwitch,
                                    goBackButton
                                }: PropsWithChildren<DialogTitleProps>) => {
                        return <DialogTitle sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}>
                            <Stack direction="row" width="100%" alignItems="center" gap={1}>
                                {closeButton}
                                <Typography variant="h6" component="span" color="text.primary">
                                    {children}
                                </Typography>
                                <Stack flexGrow={1} direction="row-reverse" spacing={1}>
                                    {fullScreenSwitch}
                                    {goBackButton}
                                </Stack>
                            </Stack>
                        </DialogTitle>
                    }
                },
                closeButton: {
                    Component: ({onClick}) => <IconButton edge="start" onClick={onClick} aria-label="close"
                                                          data-e2e="close-dialog">
                        <Close/>
                    </IconButton>
                },
                collapseButton: {
                    Component: ({onClick}) => <IconButton onClick={onClick}><UnfoldLessIcon sx={{
                        rotate: '45deg'
                    }}/> </IconButton>
                },
                expandButton: {
                    Component: ({onClick}) => <IconButton onClick={onClick}><UnfoldMoreIcon sx={{
                        rotate: '45deg'
                    }}/> </IconButton>
                },
                goBackButton: {
                    Component: ({onClick, label}) =>
                        <Button variant="text" onClick={onClick}>
                            <Stack direction="row" spacing={1}>
                                {backIcon}
                                <Typography component="span" fontWeight='normal'>
                                    Go back to {label}
                                </Typography>
                            </Stack>
                        </Button>
                }
            },
            breadcrumb: {
                Component: () => <></>
            }
        }
    }
}
