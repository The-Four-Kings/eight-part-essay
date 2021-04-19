import { BinaryTree, typeNext } from "../struct/tree";

export function genArr(len: number, randomLen?: number): number[] {
    const arr = [];
    randomLen = randomLen || len;
    for (let index = 0; index < len; index++) {
        arr.push(Math.floor(Math.random() * randomLen));
    }
    return arr;
}

export function genBinaryTree(len: number, randomLen?: number, typeNext: typeNext = "parent"): BinaryTree {
    const tree = new BinaryTree();
    const arr = genArr(len, randomLen);
    for (var i = 0; i < arr.length; i++) {
        tree.insert(arr[i], typeNext);
    }
    return tree;
}