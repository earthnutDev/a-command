import { dataStore } from '../data-store';

/**
 *
 * 键盘中右键触发
 *
 */
export function fightKey(arr: string[], _index: number, len: number) {
  const { kind, enterText } = dataStore;
  if (kind === 0) {
    dataStore.indexOfCursor =
      dataStore.indexOfCursor == dataStore.enterText.length
        ? 0
        : dataStore.indexOfCursor + 1;
  } else {
    enterText[0] = arr[_index == len ? 0 : _index + 1];
  }
}
