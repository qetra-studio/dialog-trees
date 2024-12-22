import type { ReactNode } from 'react';

import type { DialogProps } from '@mui/material/Dialog';
import type { DialogContentProps } from '@mui/material/DialogContent';

import type { DreesDialogTitleProps } from '@base/DreesDialogTitle';

type DreesDialogNodesMap = Record<string, DreesDialogNode>;

export interface TailsDialogProps<T extends DreesDialogNodesMap> {
	open: boolean;
	onClose: () => void;
	defaultFullScreen?: true;
	hideFullScreenSwitch?: true;
	maxWidth?: DialogProps['maxWidth'];
	slotProps?: Partial<{
		dialog: Omit<DialogProps, 'open'> & Record<string, any>;
		title: Record<Exclude<string, keyof DreesDialogTitleProps>, any>;
		content: DialogContentProps & Record<string, any>;
	}>;
	nodes: T;
	defaultNode: NodeKey<T>;
}

export interface DreesDialogNodeFactoryOutput {
	nodes: DreesDialogNodesMap;
}

export type NodeKey<T extends DreesDialogNodesMap> = keyof T extends infer K
	? K extends string & keyof T
		? T[K] extends { nodes: infer C }
			? C extends DreesDialogNodesMap
				? K | `${K}.${NodeKey<C>}` // if node has children nodes - provide a set of child keys
				: K
			: K
		: never
	: never;

export type DreesDialogNode = {
	label: string;
	dialog: {
		slotProps?: Partial<{
			dialog: Omit<DialogProps, 'open'> & Record<string, any>;
			title: Pick<DreesDialogTitleProps, 'childRight' | 'childLeft'> & Record<string, any>;
			content: DialogContentProps & Record<string, any>;
		}>;
		actions?: ReactNode;
		content: ReactNode;
		title: DreesDialogTitleProps['title'];
	};
	nodes?: DreesDialogNodesMap;
};

export type DialogNodeBreadcrumb<T extends DreesDialogNodesMap> = { id: NodeKey<T>; label: string };

export interface DialogTreeNavigation<T extends DreesDialogNodesMap, C extends keyof T> {
	navigate: (nodeId: NodeKey<T>) => void;
	goTo: (nodeId: NodeKey<T>) => void;
	goToChild: (
		childNodeId: T[C] extends {
			nodes: infer N;
		}
			? N extends DreesDialogNodesMap
				? NodeKey<N>
				: never
			: never
	) => void;
	goBack: () => void;
}
