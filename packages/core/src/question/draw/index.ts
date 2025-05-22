import { __p, _p, cursorHide, cursorPositionUndo } from 'a-node-tools';
import { brightRedPen, italicPen, strInOneLineOnTerminal } from 'color-pen';
import { dataStore } from '../data-store';
import { csi, terminalResetStyle } from '@color-pen/static';
import { dog } from '../../dog';
import { isEmptyString, isString } from 'a-type-of-js';
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
  //  清理旧的输入信息并将光标移动到输入最左侧
  cursorPositionUndo();
  cursorHide();
  let text = `\r${csi}0J${terminalResetStyle}`;
  if (currentIssue.mustInfo) {
    // 当上一次敲击 enter 键却没有输入时
    text = printMustInfo(text);
  }
  /**  在必填时展示红色的  */
  const requiredStr =
    kind === 0 && currentIssue.required ? brightRedPen.blink('*') : '';
  // 显示头
  text += `${prefixList.current()} ${requiredStr}${currentIssue.text}${requiredStr}: `;

  //  答应选择模式
  if (kind !== 0) {
    // 打印选择模式
    text = printSimpleCheck(text);
  }
  //   输入为空且有提示时，打印提示信息
  else if (enterText.length == 0 && isString(currentIssue.tip)) {
    // 没有提示文本信息
    if (isEmptyString(currentIssue.tip)) {
      text += italicPen.dim.blink('I');
    } else {
      // 打印含提示且用户为输入时文本
      text += ' '
        .concat(bgPen666.italic.dim(currentIssue.tip[0]))
        .concat(italicPen.dim(currentIssue.tip.slice(1)));
      // 将光标移送到输入位置
    }
  } else {
    // 有输入的时候展示
    text = computerStr(text);
  }
  dog('计算完成的文本为', text);
  _p(strInOneLineOnTerminal(text));
  translateCursor();
  __p('8m');
}, 66);
