import { bgPen666 } from '../../../utils/info';
import { dataStore } from '../../data-store';
import { strInTerminalLength } from 'color-pen';
import { endOfLineAndExtraLong } from './endOfLineAndExtraLong';
import { notEndOfLineExtraLong } from './notEndOfLineExtraLong';

/**
 *
 * 打印文本模式
 *
 * @param text 最终打印的文本
 * @param remainingUsableLength  剩余可用的长度
 *
 */
export function printText(text: string, remainingUsableLength: number): string {
  const { enterText, indexOfCursor } = dataStore;

  /**  是否超长  */
  const extraLong =
    strInTerminalLength(enterText.join('')) > remainingUsableLength;
  if (indexOfCursor === enterText.length) {
    if (extraLong) {
      // 文本超出限制长度
      text = endOfLineAndExtraLong(text, remainingUsableLength);
    } else {
      // 未超长
      text += enterText.join('');
    }
    text += bgPen666(' ');
  } else {
    // 文本长度超限
    if (extraLong) {
      text = notEndOfLineExtraLong(text, remainingUsableLength);
    } else {
      // 文本长度正常
      text += ` ${enterText.map((e, i) => (i === indexOfCursor ? bgPen666(e) : e)).join('')}`;
    }
  }

  return text;
}
