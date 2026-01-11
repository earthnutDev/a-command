import { csi, terminalResetStyle } from '@color-pen/static';
import { debounce } from 'a-js-tools';
import { __p, _p, cursorHide, cursorMoveRight } from 'a-node-tools';
import {
  isBoolean,
  isEmptyArray,
  isEmptyString,
  isFalse,
  isRegExp,
  isString,
  isTrue,
  isUndefined,
  isZero,
} from 'a-type-of-js';
import {
  brightRedPen,
  brightYellowPen,
  cutoffStringWithChar,
  hidePen,
  italicPen,
  magentaPen,
  redPen,
  strInOneLineOnTerminal,
  strInTerminalLength,
  truncateStringWithChar,
  underlinePen,
} from 'color-pen';
import { prefixList } from '../info';
import { dog } from '../utils/dog';
import { bgPen666, ellipsis } from '../utils/pen';
import { dataStore } from './data-store';

/**  ## 防抖绘制 */
export const draw = debounce(() => {
  const { kind, currentIssue, enterText } = dataStore;

  const { mustInfo, text: _text, required, tip, verify } = currentIssue;
  cursorHide();
  /**  渲染字符串  */
  let text = '',
    /**  是否打印了其他信息  */
    printInfo = false;
  if (!isZero(currentIssue.row)) {
    text += `${csi}${currentIssue.row}A`;
    currentIssue.row = 0;
  }
  text += `\r${csi}0J${terminalResetStyle}`;
  if (mustInfo) {
    // 当上一次敲击 enter 键却没有输入时
    text = printMustInfo(text);
    printInfo = true;
  } else if (!isEmptyArray(enterText)) {
    // 检验为下一次的绘制前进行校验
    const userInputStr = enterText.join('');
    // 检验验证
    for (const i of verify) {
      // 校验
      if (
        isRegExp(i.reg) &&
        isString(i.info) &&
        [isUndefined, isBoolean].some(e => e(i.inverse))
      ) {
        i.reg.lastIndex = 0;
        const result = i.reg.test(userInputStr);
        if (
          (isTrue(i.inverse) && isTrue(result)) ||
          (isTrue(!i.inverse) && isFalse(result))
        ) {
          currentIssue.mustInfo = i.warn ? brightYellowPen(i.info) : i.info;
          text = printMustInfo(text);
          printInfo = true;
          break;
        }
      }
    }
  }
  /**  在必填时展示红色的  */
  const requiredStr = kind === 0 && required ? brightRedPen.blink('*') : '';
  // 显示头
  const title = `${prefixList.current()} ${requiredStr}${_text}${requiredStr}: `;
  text += title;
  currentIssue.row += Number(currentIssue.isWrapLine); // 根据是否换行移动行数
  text += '\n'.repeat(Number(currentIssue.isWrapLine)); // 打印换行

  //  答应选择模式
  if (!isZero(kind)) {
    // 打印选择模式
    text = printSimpleCheck(text);
  }
  //   输入为空且有提示时，打印提示信息
  else if (isEmptyArray(enterText) && isString(tip)) {
    // 没有提示文本信息
    if (isEmptyString(tip)) {
      text += italicPen.dim.blink('I');
    } else {
      // 打印含提示且用户为输入时文本
      text += ' '
        .concat(bgPen666.italic.dim(tip[0]))
        .concat(italicPen.dim(tip.slice(1)));
    }
  } else {
    // 有输入的时候展示
    text += ' ';
    text = computerStr(text);
  }
  dog('计算完成的文本为', text);
  _p(strInOneLineOnTerminal(text));
  currentIssue.row++; // _p 自带换行
  translateCursor(printInfo); // 光标移动
  if (!printInfo) {
    // 光标保护
    _p(hidePen('I'), false);
  }
  __p('8m');
}, 66);

/**
 * 打印必输入的文本提示
 * @param text
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
  text += `\r${csi}1A`; // 光标向上且重置到左侧
  currentIssue.row--; // 光标手动向上
  currentIssue.mustInfo = false; // 下次打印不再展示该文本
  return text;
}

/**
 * 打印普通的选择模式
 * @param text 选择模式的文本展示
 */
function printSimpleCheck(text: string): string {
  const { currentIssue, enterText } = dataStore;
  return (
    text +
    (currentIssue.tip as string[])
      .map(i =>
        i === enterText[0] ? underlinePen.bold.blink.cyan(i) : magentaPen(i),
      )
      .join('  ')
  );
}

/**
 * 计算渲染字符串模式
 * @param text 计算字符串
 */
function computerStr(text: string) {
  const { type, usableLength } = dataStore.currentIssue;
  if (type === 'text') {
    // 当不包含提示信息时，打印用户输入的文本
    text = printText(text, usableLength);
  } else {
    // 使用 ** 代替原始输入文本的密码模式
    text = printPassword(text);
  }
  return text;
}

/**
 *
 * ## 打印文本模式
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
    text += bgPen666.hide(' ');
  } else {
    // 文本长度超限
    if (extraLong) {
      text = notEndOfLineExtraLong(text, remainingUsableLength);
    } else {
      // 文本长度正常
      text += `${enterText.map((e, i) => (i === indexOfCursor ? bgPen666(e) : e)).join('')}`;
    }
  }

  return text;
}

/**
 * ## 文本长度超出了限制却不是在文未
 * @param text 待渲染文本
 * @param remainingUsableLength 剩余可用长度
 * @returns 可完成渲染（已截断）的文本
 */
function notEndOfLineExtraLong(
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

/**
 * ## 根据给定长度截断字符串
 * @param text 文本
 * @param remainingUsableLength 截断长度
 * @returns 截断后的文本
 */
function endOfLineAndExtraLong(
  text: string,
  remainingUsableLength: number,
): string {
  const { enterText } = dataStore;
  // 超长在行首末反着就计算应截断长度
  text += ellipsis.concat(
    [
      ...truncateStringWithChar(
        enterText.toReversed().join(''),
        remainingUsableLength - 3,
        false,
      ),
    ]
      .reverse()
      .join(''),
  );
  return text;
}

/**
 *  打印密码模式
 * @param text
 */
function printPassword(text: string): string {
  const { enterText, indexOfCursor } = dataStore;
  if (indexOfCursor === enterText.length) {
    text += ` ${enterText.map(() => '*').join('')}`;

    text += bgPen666.hide('1');
  } else {
    text += ` ${enterText.map((e, i) => (i === indexOfCursor ? bgPen666('*') : '*')).join('')}`;
  }
  return text;
}

/**
 * ## 光标移动
 * @param printInfo  打印了其他信息，这时候需要触发判断是否挪动光标的位置
 */
function translateCursor(printInfo: boolean) {
  const { currentIssue, indexOfCursor, enterText } = dataStore;

  const { text, required, mustInfoLen } = currentIssue;

  if (printInfo) {
    return cursorMoveRight(mustInfoLen);
  }

  const enterStr = enterText.slice(0, indexOfCursor).join('');

  const str = text.toString().concat(enterStr);

  const computerLength = strInTerminalLength(str);

  const result = computerLength + 7 + Number(required) * 2;

  /**  理论偏移量   */
  const theoreticalOffset = result % process.stdout.columns;

  dog('用户输入', enterText.join(''));
  dog('光标所在的位置', indexOfCursor);
  dog('实际参与计算的用户输入的文本为', enterStr);
  dog('计算总文本', str);
  dog('计算文本长度', computerLength);
  dog('计算可用长度', result);
  dog('屏幕宽', process.stdout.columns);
  dog('光标偏移量', result % process.stdout.columns);

  cursorMoveRight(theoreticalOffset);
}
