import type { DreesDialogNode, NodeKey } from './types';

export function findNode<T extends Record<string, DreesDialogNode>>(
	nodes: T,
	key?: NodeKey<T>
): DreesDialogNode | undefined {
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
