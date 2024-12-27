import TailsDialog from '../../base/TailsDialog';
import {useTreeDialogContext} from '@contexts/index';
import Breadcrumb from "@dialog/Breadcrumb";
import {DialogNodeBreadcrumb, TailsDialogNode, TailsDialogProps, NodeKey} from "@dialog/types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const backIcon = <ArrowBackIosNewIcon/>;

export default function DialogNode<T extends Record<string, TailsDialogNode>>({
                                                                          node,
                                                                          prevNodeLabel,
                                                                          breadcrumbs,
                                                                          nodeId,
                                                                          ...props
                                                                      }: {
    node: TailsDialogNode;
    prevNodeLabel?: string;
    nodeId: NodeKey<T>;
    breadcrumbs: DialogNodeBreadcrumb<T>[];
} & Omit<TailsDialogProps<T>, 'nodes' | 'defaultNode'>) {
    const {goBack, navigate} = useTreeDialogContext<T, NodeKey<T>>();
    const {title, content, actions} = node.dialog;

    const slotProps = props.slotProps;

    return (
        <TailsDialog
            key="dialog-node"
            {...props}
            title={title}
            actions={
                <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                    <Breadcrumbs>
                        {breadcrumbs.map(({id, label}) => (
                            <Breadcrumb key={id} value={label} onClick={() => navigate(id)}/>
                        ))}
                    </Breadcrumbs>
                    {actions}
                </Stack>
            }
            slotProps={{
                ...slotProps,
                title: {
                    ...slotProps?.title,
                    childRight:
                        prevNodeLabel || slotProps?.title?.childRight ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                                {prevNodeLabel ? (
                                    <Button variant="text" onClick={goBack}>
                                        <Stack direction="row" spacing={1}>
                                            {backIcon}
                                            <Typography component="span" variant="inherit">
                                                Go back to {prevNodeLabel}
                                            </Typography>
                                        </Stack>
                                    </Button>
                                ) : null}
                                {slotProps?.title?.childRight}
                                <Divider orientation="vertical" flexItem/>
                            </Stack>
                        ) : undefined,
                },
            }}
        >
            {content}
        </TailsDialog>
    );
}
