import { _p, cursorMoveUp } from 'a-node-tools';
import { strInTerminalLength } from 'color-pen';
import { dataStore } from './data-store';

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

/**  产看是否需要换行  */
function lineBreak() {
  const { currentIssue } = dataStore;
  /**  终端宽度  */
  const screenWidth = process.stdout.columns;
  /**  剩余可用长度  */
  let remainingUsableLength =
    screenWidth -
    strInTerminalLength(currentIssue.text.toString()) - // 减去展示的问题行
    2 * Number(currentIssue.required) - // 减去是必须的符号展示
    4 - // 减去空格
    7; // 减去安全渲染字符区
  /**  是否换行  */
  const isWrapLine = remainingUsableLength < 5;

  // 需要换行则追加换行符
  if (isWrapLine) {
    remainingUsableLength = screenWidth - 4;
  }

  currentIssue.isWrapLine = isWrapLine;
  currentIssue.usableLength = remainingUsableLength;
}
