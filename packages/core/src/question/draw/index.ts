import { __p, _p, cursorHide, cursorPositionUndo } from 'a-node-tools';
import {
  brightRedPen,
  hidePen,
  italicPen,
  magentaPen,
  redPen,
  underlinePen,
} from 'color-pen';
import { dataStore } from '../data-store';
import { csi, terminalResetStyle } from '@color-pen/static';
import { dog } from '../../dog';
import { isEmptyString, isString } from 'a-type-of-js';
import { bgPen666, prefixList } from '../../utils/info';
import { translateCursor } from './translateCursor';
/**
 *
 *  绘制
 * */
export const draw = () => {
  const { kind, currentIssue, enterText, indexOfCursor } = dataStore;
  //  清理旧的输入信息并将光标移动到输入最左侧
  cursorPositionUndo();
  cursorHide();
  let text = `\r${csi}0J${terminalResetStyle}`;
  if (currentIssue.mustInfo) {
    const requiredStr = currentIssue.required ? hidePen('*') : '';
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
    currentIssue.mustInfo = false; // 下次打印不再暂时该文本
  }
  /**  在必填时展示红色的  */
  const requiredStr =
    kind === 0 && currentIssue.required ? brightRedPen.blink('*') : '';
  // 显示头
  text += `${prefixList.current()} ${requiredStr}${currentIssue.text}${requiredStr}: `;

  //  答应选择模式
  if (kind !== 0) {
    // 打印选择模式
    text += (currentIssue.tip as string[])
      .map(i =>
        i === enterText[0] ? underlinePen.bold.blink.cyan(i) : magentaPen(i),
      )
      .join('  ');
  }
  //   输入为空且有提示时，打印提示信息
  else if (enterText.length == 0 && isString(currentIssue.tip)) {
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
    // 当不包含提示信息时，打印用户输入的文本
    if (currentIssue.type === 'text') {
      if (indexOfCursor === enterText.length) {
        text += ` ${enterText.join('')}`;
        text += bgPen666.hide('1');
      } else {
        text += ` ${enterText.map((e, i) => (i === indexOfCursor ? bgPen666(e) : e)).join('')}`;
      }
    }
    // 使用 ** 代替原始输入文本的密码模式
    else {
      if (indexOfCursor === enterText.length) {
        text += ` ${enterText.map(() => '*').join('')}`;

        text += bgPen666.hide('1');
      } else {
        text += ` ${enterText.map((e, i) => (i === indexOfCursor ? bgPen666('*') : '*')).join('')}`;
      }
    }
  }
  dog('计算完成的文本为', text);
  _p(text);
  translateCursor();
  __p('8m');
};
