import {DialogTreeNavigation, TailsDialogNode, NodeKey} from "@dialog/types";
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';


export type TreeDialogContextMembers<
    T extends Record<string, TailsDialogNode>,
    C extends NodeKey<T>,
> = DialogTreeNavigation<T, C> & {
    close: () => void;
};

const TreeDialogContextContext = createContext<
    TreeDialogContextMembers<Record<string, TailsDialogNode>, NodeKey<Record<string, TailsDialogNode>>>
>({
    navigate: () => {},
    goTo: () => {},
    goBack: () => {},
    goToChild: () => {},
    close: () => {},
});

export const useTreeDialogContext = <T extends Record<string, TailsDialogNode>, C extends NodeKey<T>>() =>
    useContext(TreeDialogContextContext) as TreeDialogContextMembers<T, C>;

export default function TreeDialogContextProvider<T extends Record<string, TailsDialogNode>, C extends NodeKey<T>>({
                                                                                                               children,
                                                                                                               ...ctx
                                                                                                           }: PropsWithChildren<TreeDialogContextMembers<T, C>>) {
    return (
        <TreeDialogContextContext.Provider
            value={ctx as TreeDialogContextMembers<Record<string, TailsDialogNode>, NodeKey<Record<string, TailsDialogNode>>>}
        >
            {children}
        </TreeDialogContextContext.Provider>
    );
}
