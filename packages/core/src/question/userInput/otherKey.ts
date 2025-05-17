import { isUndefined } from 'a-type-of-js';
import { dataStore } from '../data-store';

/**
 *
 * 其他键
 *
 */
export function otherKey(keyValue: string | undefined) {
  const { enterText, kind } = dataStore;
  console.log('\n\n\n');

  console.log(otherKey);

  // 在当前模式为用户输入模式时
  if (!isUndefined(keyValue) && kind === 0) {
    if (dataStore.indexOfCursor == enterText.length) {
      enterText.push(keyValue);
    } else {
      enterText.splice(dataStore.indexOfCursor, 0, keyValue);
    }
    dataStore.indexOfCursor += 1;
  }
}
