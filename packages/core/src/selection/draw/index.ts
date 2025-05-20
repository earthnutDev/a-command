import {
  __p,
  _p,
  cursorAfterClear,
  cursorLineClear,
  cursorMoveDown,
  cursorMoveLeft,
  cursorPositionUndo,
} from 'a-node-tools';
import { selectionData } from '../data-store';
import { hexPen, redPen, strInOneLineOnTerminal } from 'color-pen';
import { diffDrawData } from './diff';
import { prefixList } from '../../utils/info';
import { debounce } from 'a-js-tools';
import { dun } from '../../dog';
/**
 *
 * 绘制
 *
 */
export const draw = debounce(() => {
  if (dun) {
    cursorPositionUndo(); // 恢复光标位置
  }
  diffDrawData(); // 计算差异

  const { info, drawData, kind, mustInfo } = selectionData;
  cursorMoveLeft(Infinity);
  cursorLineClear(true);
  _p(strInOneLineOnTerminal(`${prefixList.current()}  ${info} \n`));
  // 根据行的是否有变化
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
  if (mustInfo) {
    selectionData.mustInfo = false;
    _p(
      redPen(
        '\n抱歉，该项至少选择一项！！！\n请使用空格键或是左右键切换选择状态',
      ),
    );
  } else {
    cursorAfterClear();
  }
  if (dun) {
    __p('8m'); // 输出无色文字
    cursorPositionUndo();
  }
}, 66);
