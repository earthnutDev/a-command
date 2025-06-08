import { isZero } from 'a-type-of-js';
import { dataStore } from '../data-store';

/**
 *
 * 删除键或回退键
 *
 */
export function delKey() {
  const { enterText, kind } = dataStore;
  if (isZero(kind) && !isZero(dataStore.indexOfCursor)) {
    enterText.splice(dataStore.indexOfCursor - 1, 1);
    dataStore.indexOfCursor--;
  }
}
