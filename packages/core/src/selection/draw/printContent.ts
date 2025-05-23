import { strInOneLineOnTerminal } from 'color-pen';
import { ellipsis, pen666, prefixList } from '../../utils/info';
import { selectionData } from '../data-store';

/**  渲染主内容  */
export function printContent(): string {
  const { drawData, kind } = selectionData;
  let text = '';
  // 遍历需要绘制的每一行
  for (let i = 0, j = drawData.length; i < j; i++) {
    const currentLine = drawData[i];
    if (!currentLine.show) continue;
    if (currentLine.focus) {
      /**  前缀  */
      const prefix =
        kind === 'radio'
          ? prefixList.radioSelect()
          : currentLine.checked
            ? prefixList.multipleChoiceCheckedFocus()
            : prefixList.multipleChoiceFocus();
      const lineText = ` ${prefix} ${drawData[i].text}`;
      // 添加改行
      text += strInOneLineOnTerminal(lineText);
      text += '\n';
    } else if (currentLine.text === ellipsis) {
      // 添加 。。。
      text += ` ${ellipsis}`;
      text += '\n';
    } else {
      /**  前缀  */
      const prefix =
        kind === 'radio'
          ? prefixList.radioNoSelect()
          : currentLine.checked
            ? prefixList.multipleChoiceChecked()
            : prefixList.multipleChoice();
      const lineText = ` ${prefix} ${pen666(drawData[i].text || '')}`;
      text += strInOneLineOnTerminal(lineText);
      text += '\n';
    }
  }

  return text;
}
