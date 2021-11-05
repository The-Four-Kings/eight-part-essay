import { performance } from 'perf_hooks';

import { heapSort } from '@/algorithms/sort/heapSort';
import { creatArray } from '@/utils/creator';

function sort(arr: number[], sortFn: (_: number[]) => number[]): void {
    const len = arr.length;
    const beforeTime = performance.now();
    console.log(`${sortFn.name} before arr:`, arr);
    arr = sortFn(arr);
    const afterTime = performance.now();
    console.log(`${sortFn.name} after arr:`, arr);
    console.log(`${sortFn.name} cost time: ${afterTime - beforeTime}ms`);

    if (check(arr, len)) {
        console.info(`${sortFn.name} success`);
    } else {
        console.error(`${sortFn.name} failed`);
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
