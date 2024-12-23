import type { TailsDialogNode, NodeKey } from './types';

export function findNode<T extends Record<string, TailsDialogNode>>(
	nodes: T,
	key?: NodeKey<T>
): TailsDialogNode | undefined {
	if (!key) {
		return;
	}
	const split = key.split('.');
	if (split.length === 1) {
		return nodes[key];
	}
	const [first, ...parts] = split;
	let result = nodes[first];
	parts.forEach((x) => (result = result.nodes?.[x]!));
	return result;
}
