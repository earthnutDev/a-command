import { terminalResetStyle } from '@color-pen/static';
import { debounce } from 'a-js-tools';
import { _p, cursorAfterClear, cursorMoveUp } from 'a-node-tools';
import { isZero } from 'a-type-of-js';
import { dataStore } from './data-store';
import { draw } from './draw';
import { outputSafeZone } from './outputSafeZone';

/**  当终端发生尺寸变化  */
export const onResize = debounce(() => {
  const { currentIssue } = dataStore;
  if (!isZero(currentIssue.row)) {
    cursorMoveUp(currentIssue.row, true);
    currentIssue.row = 0;
  }
  _p(terminalResetStyle, false); // 重置属性
  cursorAfterClear(true);
  outputSafeZone();
  draw();
});
