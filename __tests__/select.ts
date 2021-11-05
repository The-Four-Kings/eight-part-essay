import { performance } from 'perf_hooks';

import { quickSelect } from '@/algorithms/select/quickSelect';
import { creatArray } from '@/utils/creator';

function select(arr: number[], selectFn: (_: number[], __: number) => number, k: number): void {
    const beforeTime = performance.now();
    const val = selectFn(arr, k);
    const afterTime = performance.now();
    console.log(`${selectFn.name} cost time: ${afterTime - beforeTime}ms`);
    console.log(`${selectFn.name} arr:`, arr);
    if (val !== null) {
        console.info(`${selectFn.name} found k:${k} val:${val}`);
    } else {
        console.error(`${selectFn.name} not found k:${k} val:${val} `);
    }
}

const len = 10;
const k = 1;
const arr = creatArray(len);
select(arr.concat(), quickSelect, k);
