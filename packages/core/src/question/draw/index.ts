import { __p, _p, cursorHide } from 'a-node-tools';
import {
  brightRedPen,
  hidePen,
  italicPen,
  strInOneLineOnTerminal,
} from 'color-pen';
import { dataStore } from '../data-store';
import { csi, terminalResetStyle } from '@color-pen/static';
import { dog } from '../../dog';
import { isEmptyString, isFalse, isString } from 'a-type-of-js';
import { bgPen666, prefixList } from '../../utils/info';
import { translateCursor } from './translateCursor';
import { debounce } from 'a-js-tools';
import { computerStr } from './computerStr';
import { printSimpleCheck } from './printSimpleCheck';
import { printMustInfo } from './printMustInfo';
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
  if (currentIssue.row !== 0) {
    text += `${csi}${currentIssue.row}A`;
    currentIssue.row = 0;
  }
  text += `\r${csi}0J${terminalResetStyle}`;
  if (mustInfo) {
    // 当上一次敲击 enter 键却没有输入时
    text = printMustInfo(text);
    printInfo = true;
  } else if (enterText.length > 0) {
    // 检验为下一次的绘制前进行校验
    const userInputStr = enterText.join('');
    // 检验验证
    for (const element of verify) {
      element.reg.lastIndex = 0;
      if (isFalse(element.reg.test(userInputStr))) {
        currentIssue.mustInfo = element.info;
        text = printMustInfo(text);
        printInfo = true;
        break;
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
  if (kind !== 0) {
    // 打印选择模式
    text = printSimpleCheck(text);
  }
  //   输入为空且有提示时，打印提示信息
  else if (enterText.length == 0 && isString(tip)) {
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
