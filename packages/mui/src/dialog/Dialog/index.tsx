import TreeDialogContextProvider, {TreeDialogContextMembers} from "@contexts/DialogTreeContext";
import DialogNode from "@dialog/Node";
import {DialogNodeBreadcrumb, DreesDialogNode, TailsDialogProps, NodeKey} from "@dialog/types";
import {findNode} from "@dialog/utils";
import { useEffect, useMemo, useState } from 'react';


export default function TailsMuiDialog<T extends Record<string, DreesDialogNode>>({
                                                                                   nodes,
                                                                                   defaultNode,
                                                                                   open,
                                                                                   ...props
                                                                               }: TailsDialogProps<T>) {
    const { onClose } = props;
    const [history, setHistory] = useState([defaultNode]);

    const { id, prevNodeId, node, prevNode, breadcrumbs } = useMemo(() => {
        const id = history[history.length - 1];
        const idParts = id.split('.');
        const node = findNode(nodes, id)!;
        let prevNodeId: NodeKey<T> | undefined;
        if (history.length > 1) {
            prevNodeId = history[history.length - 2];
        } else if (idParts.length > 1) {
            prevNodeId = idParts.slice(0, idParts.length - 1).join('') as NodeKey<T>;
        }
        const prevNode = findNode(nodes, prevNodeId);
        const breadcrumbs: DialogNodeBreadcrumb<T>[] = [];
        idParts.forEach((x, index) => {
            const id = (breadcrumbs[index - 1] ? `${breadcrumbs[index - 1].id}.${x}` : x) as NodeKey<T>;
            breadcrumbs.push({
                id,
                label: findNode(nodes, id)?.label!,
            });
        });
        return { id, prevNodeId, node, prevNode, breadcrumbs };
    }, [history, nodes]);

    useEffect(() => {
        if (!open) {
            const timeout = setTimeout(() => setHistory([defaultNode]), 300);
            return () => clearTimeout(timeout);
        }
        return undefined;
    }, [defaultNode, open]);

    const ctx = useMemo(
        () =>
            ({
                navigate: (nodeId) => setHistory([nodeId]),
                goTo: (nodeId) => setHistory((prev) => [...prev, nodeId]),
                goBack: () => {
                    if (history.length > 1) {
                        setHistory((prev) => prev.slice(0, -1));
                    } else if (prevNodeId) {
                        setHistory([prevNodeId]);
                    } else {
                        onClose();
                    }
                },
                goToChild: (nodeId) => {
                    const hasNode = node.nodes?.hasOwnProperty(nodeId);
                    if (!hasNode) {
                        return;
                    }
                    setHistory((prev) => [...prev, `${id}.${nodeId}`]);
                },
                close: onClose,
            }) as const satisfies TreeDialogContextMembers<T, NodeKey<T>>,
        [history.length, id, node.nodes, onClose, prevNodeId]
    );

    return (
        <TreeDialogContextProvider {...ctx}>
            {open ? <DialogNode<T>
                node={node}
                nodeId={id}
                open={open}
                prevNodeLabel={prevNode?.label}
                {...props}
                breadcrumbs={breadcrumbs}
            /> : null}
        </TreeDialogContextProvider>
    );
}
