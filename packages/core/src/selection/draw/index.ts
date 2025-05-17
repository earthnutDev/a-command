import {
  __p,
  _p,
  cursorLineClear,
  cursorMoveDown,
  cursorMoveLeft,
  cursorPositionUndo,
} from 'a-node-tools';
import { selectionData } from '../data-store';
import { hexPen, strInOneLineOnTerminal } from 'color-pen';
import { diffDrawData } from './diff';
import { prefixList } from '../../utils/info';
import { debounce } from 'a-js-tools';
/**
 *
 * 绘制
 *
 * */
export const draw = debounce(() => {
  cursorPositionUndo(); // 恢复光标位置
  diffDrawData(); // 计算差异

  const { info, drawData, kind } = selectionData;
  cursorMoveLeft(Infinity);
  cursorLineClear(true);
  _p(`${prefixList.current()}  ${info} \n`);

  // 遍历需要绘制的每一行
  for (let i = 0, j = drawData.length; i < j; i++) {
    const currentLine = drawData[i];
    if (currentLine.changed) {
      if (currentLine.focus) {
        cursorLineClear(true);
        const prefix =
          kind === 'radio'
            ? prefixList.radioSelect()
            : currentLine.checked
              ? prefixList.multipleChoiceCheckedFocus()
              : prefixList.multipleChoiceFocus();
        const lineText = ` ${prefix} ${drawData[i].text}`;
        _p(strInOneLineOnTerminal(lineText));
      } else {
        cursorLineClear(true);
        const prefix =
          kind === 'radio'
            ? prefixList.radioNoSelect()
            : currentLine.checked
              ? prefixList.multipleChoiceChecked()
              : prefixList.multipleChoice();
        const lineText = ` ${prefix} ${hexPen('#666')(drawData[i].text || '')}`;
        _p(strInOneLineOnTerminal(lineText));
      }
    } else {
      cursorMoveDown(1, true);
    }
  }
  __p('8m'); // 输出无色文字

  cursorPositionUndo();
});
