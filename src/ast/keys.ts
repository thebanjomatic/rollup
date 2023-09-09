import type { GenericEsTreeNode } from './nodes/shared/Node';

export const keys: {
	[name: string]: string[];
} = {
	// TODO this should be removed once ImportExpression follows official ESTree
	//  specs with "null" as default
	ImportExpression: ['arguments'],
	Literal: [],
	Program: ['body']
};

export function ensureKeysAreDefinedForNodeType(esTreeNode: GenericEsTreeNode): void {
	const { type } = esTreeNode;
	if (keys[type]) {
		return;
	}
	keys[type] = Object.keys(esTreeNode).filter(
		key => typeof esTreeNode[key] === 'object' && key.charCodeAt(0) !== 95 /* _ */
	);
}
