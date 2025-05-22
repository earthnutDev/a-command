import { csi } from '@color-pen/static';
import { dataStore } from '../data-store';
import { redPen } from 'color-pen';

/**
 * 打印必输入的文本提示
 */
export function printMustInfo(text: string): string {
  const { currentIssue } = dataStore;

  const requiredStr = currentIssue.required ? ' ' : '';
  /**  提示用户输入 👆 */
  text += '\n\r';
  text += ' '
    .repeat(2)
    .concat(requiredStr)
    .concat(redPen(currentIssue.text))
    .concat(requiredStr)
    .concat(' '.repeat(3));
  // 打印手指
  text += redPen.blink`👆`;
  // 光标向上且重置到左侧
  text += `\r${csi}1A`;
  currentIssue.mustInfo = false; // 下次打印不再展示该文本
  return text;
}
