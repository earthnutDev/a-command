import { debounce } from 'a-js-tools';
import { terminalResetStyle } from '@color-pen/static';
import { _p, cursorAfterClear, cursorMoveUp } from 'a-node-tools';
import { draw } from './draw';
import { outputSafeZone } from './outputSafeZone';
import { dataStore } from './data-store';

/**  当终端发生尺寸变化  */
export const onResize = debounce(() => {
  const { currentIssue } = dataStore;
  if (currentIssue.row !== 0) {
    cursorMoveUp(currentIssue.row, true);
    currentIssue.row = 0;
  }
  _p(terminalResetStyle, false); // 重置属性
  cursorAfterClear(true);
  outputSafeZone();
  draw();
});
