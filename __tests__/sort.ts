import { performance } from 'perf_hooks';

import { heapSort } from '../src/algorithms/sort/heapSort';
import { creatArray } from '../src/utils/creator';
import logger from '../src/utils/logger';

function sort(arr: number[], sortFn: (_: number[]) => number[]): void {
    const len = arr.length;
    const beforeTime = performance.now();
    logger.log(`${sortFn.name} before arr:`, arr);
    arr = sortFn(arr);
    const afterTime = performance.now();
    logger.log(`${sortFn.name} after arr:`, arr);
    logger.log(`${sortFn.name} cost time: ${afterTime - beforeTime}ms`);

    if (check(arr, len)) {
        logger.log(`${sortFn.name} success`);
    } else {
        logger.error(`${sortFn.name} failed`);
    }
}

function check(arr: number[], len: number): boolean {
    if (arr.length !== len) return false;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

const arr = creatArray(1000);
sort(arr.concat(), heapSort);
