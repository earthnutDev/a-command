import {
  cutoffStringWithChar,
  strInTerminalLength,
  truncateStringWithChar,
} from 'color-pen';
import { dataStore } from '../../data-store';
import { ellipsis } from './ellipsis';
import { bgPen666 } from '../../../utils/info';

/**
 * 文本长度超出了限制却不是在文未
 */
export function notEndOfLineExtraLong(
  text: string,
  remainingUsableLength: number,
): string {
  const { indexOfCursor, enterText } = dataStore;
  /**  用户输入总文本长  */
  const inputStr = enterText.join('');
  /**  当前输入文本的长度  */
  const inputArrLen = enterText.length;
  /**  可用长度的一半（渲染字节长）  */
  const halfRemainingUsableLength = Math.floor(remainingUsableLength / 2);
  /**
   *  正向截取
   *
   *  小于等于该长度将以右侧为省略点
   *
   *  若该值在中位，以中位为准；若在反向，以反向为准
   */
  const forwardTruncationStr = truncateStringWithChar(
    inputStr,
    halfRemainingUsableLength,
  );
  /**  左侧位长  */
  const forwardLength = forwardTruncationStr.length - 1;
  /**  左侧最大位标（理论上大于 indexOfCursor 该值时为右侧省略号）  */
  const leftMaxIndex =
    forwardTruncationStr[forwardLength] === inputStr[forwardLength]
      ? forwardLength
      : forwardLength - 1;

  /**
   *   反向截取指定长度的字符串
   *
   *   大于等于该长度将以左侧为省略点
   */
  const reverseTruncationStr = truncateStringWithChar(
    inputStr,
    -halfRemainingUsableLength,
  );
  /**  右侧位长  */
  const reverseLength = reverseTruncationStr.length - 1;
  /**  右侧自大位标（大于该值的 indexOfCursor 值为左侧省略号） */
  const rightMaxIndex =
    reverseTruncationStr[reverseLength] ===
    inputStr[inputArrLen - 1 - reverseLength]
      ? inputArrLen - 1 - reverseLength
      : inputArrLen - reverseLength;
  /**  带样式的字符串  */
  const withStyleStr = enterText
    .map((e, i) => (i === indexOfCursor ? bgPen666(e) : e))
    .join('');

  // 位于右位
  if (indexOfCursor >= rightMaxIndex) {
    text += ellipsis;
    text += cutoffStringWithChar(
      withStyleStr,
      3 - remainingUsableLength,
      false,
    );
  }
  // 位于左侧或是输入文本的长度刚超过限制长度不多
  else if (indexOfCursor < leftMaxIndex) {
    text += cutoffStringWithChar(
      withStyleStr,
      remainingUsableLength - 3,
      false,
    );
    text += ellipsis;
  } else {
    /**  左右位的长度（ 3 是省略点的占位）  */
    const halfLength =
      halfRemainingUsableLength -
      strInTerminalLength(enterText[indexOfCursor]) -
      3;
    text += ellipsis;
    text += cutoffStringWithChar(
      inputStr.slice(0, indexOfCursor),
      -halfLength,
      false,
    );
    text += bgPen666(enterText[indexOfCursor]);
    text += cutoffStringWithChar(
      inputStr.slice(indexOfCursor + 1),
      halfLength,
      false,
    );
    text += ellipsis;
  }

  return text;
}
