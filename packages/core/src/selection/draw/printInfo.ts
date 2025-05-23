import { selectionData } from '../data-store';
import { cutoffStringWithChar, redPen, strInTerminalLength } from 'color-pen';

/**  打印提示信息  */
export function printInfo() {
  /**  终端可用显示  */
  const screenColumns = process.stdout.columns - 7;

  selectionData.mustInfo = false;
  /**  渲染的提示语  */
  const message =
    '抱歉，该项至少选择一项！！！请使用空格键或是左右键切换选择状态';
  const inTerminalLength = strInTerminalLength(message);
  const info =
    inTerminalLength < screenColumns
      ? message
      : cutoffStringWithChar(message, screenColumns);

  return '\n'.concat(redPen(info));
}
