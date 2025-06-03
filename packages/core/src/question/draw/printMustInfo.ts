import { csi } from '@color-pen/static';
import { dataStore } from '../data-store';
import { magentaPen, redPen } from 'color-pen';
import { isBoolean } from 'a-type-of-js';

/**
 * 打印必输入的文本提示
 */
export function printMustInfo(text: string): string {
  const { currentIssue } = dataStore;

  text += '\n\r';
  currentIssue.row++; // \n 导致换行 +1
  /**  提示用户输入 👆 */
  if (isBoolean(currentIssue.mustInfo)) {
    const requiredStr = currentIssue.required ? ' ' : '';
    text += ' '
      .repeat(2)
      .concat(requiredStr)
      .concat(redPen(currentIssue.text))
      .concat(requiredStr)
      .concat(' '.repeat(3));
    // 打印手指
    text += redPen.blink`👆`;
  } else {
    text += magentaPen(currentIssue.mustInfo);
  }

  // 光标向上且重置到左侧
  text += `\r${csi}1A`;
  currentIssue.row--; // 光标手动向上
  currentIssue.mustInfo = false; // 下次打印不再展示该文本
  return text;
}
