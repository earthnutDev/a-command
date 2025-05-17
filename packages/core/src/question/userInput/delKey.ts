import { dataStore } from '../data-store';

/**
 *
 * 删除键或回退键
 *
 */
export function delKey() {
  const { enterText, kind } = dataStore;
  if (kind === 0 && dataStore.indexOfCursor !== 0) {
    enterText.splice(dataStore.indexOfCursor - 1, 1);
    dataStore.indexOfCursor--;
  }
}
