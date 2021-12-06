import { getNextNode } from '../src/algorithms/temp/getNextNode';
import { consoleTreeNode } from '../src/utils/consoler';
import { genBinaryTree } from '../src/utils/creator';
import logger from '../src/utils/logger';

const tree = genBinaryTree(10, 20);
// tree.inOrder((node: TreeNode) => {
//     console.log(`val:${node.val}`);
// });

consoleTreeNode(tree.root);

const node = tree.root.right;
const nextNode = getNextNode(node);
logger.log(`getNextNode node:${node.val} nextNode:${nextNode.val}`);