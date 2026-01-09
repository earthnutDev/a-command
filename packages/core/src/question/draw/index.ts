import { csi, terminalResetStyle } from '@color-pen/static';
import { debounce } from 'a-js-tools';
import { __p, _p, cursorHide } from 'a-node-tools';
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
  hidePen,
  italicPen,
  strInOneLineOnTerminal,
} from 'color-pen';
import { bgPen666, prefixList } from '../../info/info';
import { dog } from '../../utils/dog';
import { dataStore } from '../data-store';
import { computerStr } from './computerStr';
import { printMustInfo } from './printMustInfo';
import { printSimpleCheck } from './printSimpleCheck';
import { translateCursor } from './translateCursor';
/**
 *
 *  绘制
 * */
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
  // 打印换行
  text += '\n'.repeat(Number(currentIssue.isWrapLine));

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
  translateCursor(printInfo);
  // 光标保护
  if (!printInfo) _p(hidePen('I'), false);
  __p('8m');
}, 66);
