import { csi } from '@color-pen/static';
import { dataStore } from '../data-store';
import {
  cutoffStringWithChar,
  magentaPen,
  redPen,
  strInTerminalLength,
} from 'color-pen';
import { isBoolean } from 'a-type-of-js';

/**
 * 打印必输入的文本提示
 */
export function printMustInfo(text: string): string {
  const { currentIssue } = dataStore;

  text += '\n\r';
  currentIssue.row++; // \n 导致换行 +1
  /**  绘制的必须的字符  */
  let str = '';
  /**  提示用户输入 👆 */
  if (isBoolean(currentIssue.mustInfo)) {
    const requiredStr = currentIssue.required ? ' ' : '';
    str += ' '
      .repeat(2)
      .concat(requiredStr)
      .concat(redPen(currentIssue.text))
      .concat(requiredStr)
      .concat(' '.repeat(3));
    // 打印手指
    str += redPen.blink`👆`;
  } else {
    str += magentaPen(currentIssue.mustInfo);
  }
  /**  渲染的必须的提示的长度  */
  let strLen = strInTerminalLength(str);
  /**  安全可用长度  */
  const safeLen = process.stderr.columns - 4;
  if (safeLen < strLen) {
    strLen = safeLen;
    /**  字符调整  */
    str = cutoffStringWithChar(str, safeLen);
  }

  currentIssue.mustInfoLen = strLen; // 给值

  text += str;
  // 光标向上且重置到左侧
  text += `\r${csi}1A`;
  currentIssue.row--; // 光标手动向上
  currentIssue.mustInfo = false; // 下次打印不再展示该文本
  return text;
}
