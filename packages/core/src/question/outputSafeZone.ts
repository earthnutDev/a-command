import { _p, cursorMoveUp } from 'a-node-tools';
import { dataStore } from './data-store';
import { lineBreak } from './draw/lineBreak';

/**
 *
 * 输出安全区
 */
export function outputSafeZone() {
  const { currentIssue } = dataStore;
  lineBreak(); // 产看看当前是否需要换行
  const { isWrapLine } = currentIssue;

  const rows = 2 + Number(isWrapLine);
  _p('\n'.repeat(rows), false);
  currentIssue.row += rows;
  cursorMoveUp(rows);
  currentIssue.row -= rows;
}
