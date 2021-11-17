import { performance } from 'perf_hooks';

import { insertionSearch } from '../src/algorithms/search/insertionSearch';
import { quickSort } from '../src/algorithms/sort/quickSort';
import { creatArray } from '../src/utils/creator';
import logger from '../src/utils/logger';

function search(arr: number[], searchFn: (_: number[], __: number) => number, val: number, sort?: boolean): void {
    if (sort) {
        arr = quickSort(arr);
    }

    const beforeTime = performance.now();
    const index = searchFn(arr, val);
    const afterTime = performance.now();
    logger.log(`${searchFn.name} cost time: ${afterTime - beforeTime}ms`);
    logger.log(`${searchFn.name} arr: `, arr);
    if (index !== -1) {
        logger.log(`${searchFn.name} found val:${val} index:${index}`);
    } else {
        logger.error(`${searchFn.name} not found val:${val} index:${index}`);
    }
}

const len = 100;
const val = Math.floor(Math.random() * len);
const arr = creatArray(len);
search(arr.concat(), insertionSearch, val, true);
