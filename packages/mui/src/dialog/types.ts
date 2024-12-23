import type { ReactNode } from 'react';

import type { DialogProps } from '@mui/material/Dialog';
import type { DialogContentProps } from '@mui/material/DialogContent';

import type { TailsDialogTitleProps } from '@base/TailsDialogTitle';

type TailsDialogNodesMap = Record<string, TailsDialogNode>;

export interface TailsDialogProps<T extends TailsDialogNodesMap> {
	open: boolean;
	onClose: () => void;
	defaultFullScreen?: true;
	hideFullScreenSwitch?: true;
	maxWidth?: DialogProps['maxWidth'];
	slotProps?: Partial<{
		dialog: Omit<DialogProps, 'open'> & Record<string, any>;
		title: Record<Exclude<string, keyof TailsDialogTitleProps>, any>;
		content: DialogContentProps & Record<string, any>;
	}>;
	nodes: T;
	defaultNode: NodeKey<T>;
}

export interface TailsDialogNodeFactoryOutput {
	nodes: TailsDialogNodesMap;
}

export type NodeKey<T extends TailsDialogNodesMap> = keyof T extends infer K
	? K extends string & keyof T
		? T[K] extends { nodes: infer C }
			? C extends TailsDialogNodesMap
				? K | `${K}.${NodeKey<C>}` // if node has children nodes - provide a set of child keys
				: K
			: K
		: never
	: never;

export type TailsDialogNode = {
	label: string;
	dialog: {
		slotProps?: Partial<{
			dialog: Omit<DialogProps, 'open'> & Record<string, any>;
			title: Pick<TailsDialogTitleProps, 'childRight' | 'childLeft'> & Record<string, any>;
			content: DialogContentProps & Record<string, any>;
		}>;
		actions?: ReactNode;
		content: ReactNode;
		title: TailsDialogTitleProps['title'];
	};
	nodes?: TailsDialogNodesMap;
};

export type DialogNodeBreadcrumb<T extends TailsDialogNodesMap> = { id: NodeKey<T>; label: string };

export interface DialogTreeNavigation<T extends TailsDialogNodesMap, C extends keyof T> {
	navigate: (nodeId: NodeKey<T>) => void;
	goTo: (nodeId: NodeKey<T>) => void;
	goToChild: (
		childNodeId: T[C] extends {
			nodes: infer N;
		}
			? N extends TailsDialogNodesMap
				? NodeKey<N>
				: never
			: never
	) => void;
	goBack: () => void;
}
