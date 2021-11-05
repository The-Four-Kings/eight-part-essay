import { getNextNode } from '@/algorithms/temp/getNextNode';
import { consoleTreeNode } from '@/utils/consoler';
import { genBinaryTree } from '@/utils/creator';

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     console.log(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
console.log(`getNextNode node:${node.val} nextNode:${nextNode.val}`);