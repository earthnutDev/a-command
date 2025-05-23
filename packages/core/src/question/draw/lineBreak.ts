import { strInTerminalLength } from 'color-pen';
import { dataStore } from '../data-store';

/**  产看是否需要换行  */
export function lineBreak() {
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
