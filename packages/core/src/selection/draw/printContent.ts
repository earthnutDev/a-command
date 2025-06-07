import { strInOneLineOnTerminal } from 'color-pen';
import { ellipsis, pen333, pen999, prefixList } from '../../utils/info';
import { selectionData } from '../data-store';

/**  渲染主内容  */
export function printContent(): string {
  const { drawData, kind } = selectionData;
  let text = '';
  // 遍历需要绘制的每一行
  for (let i = 0, j = drawData.length; i < j; i++) {
    const currentLine = drawData[i];
    // 不显示的行直接跳过
    if (!currentLine.show) continue;
    // 打印当前光标显示行
    if (currentLine.focus) {
      /**  前缀  */
      const prefix =
        kind === 'radio'
          ? prefixList.radioSelect()
          : currentLine.checked
            ? prefixList.multipleChoiceCheckedFocus()
            : prefixList.multipleChoiceFocus();
      const lineText = ` ${prefix} ${currentLine.text}`;
      // 添加改行
      text += strInOneLineOnTerminal(lineText);
      text += '\n';
    }
    // 打印 ... 行
    else if (currentLine.text === ellipsis) {
      // 添加 。。。
      text += ` ${ellipsis}`;
      text += '\n';
    } else if (currentLine.disable) {
      /**  禁用行  */
      /**  前缀  */
      const prefix =
        kind === 'radio'
          ? pen999`⊗`
          : currentLine.checked
            ? pen999`▣`
            : pen999`☒`;
      const lineText = ` ${prefix} ${pen999(currentLine.text)}`;
      text += strInOneLineOnTerminal(lineText);
      text += '\n';
    }
    // 标准打印行
    else {
      /**  前缀  */
      const prefix =
        kind === 'radio'
          ? prefixList.radioNoSelect()
          : currentLine.checked
            ? prefixList.multipleChoiceChecked()
            : prefixList.multipleChoice();
      const lineText = ` ${prefix} ${pen333(currentLine.text || '')}`;
      text += strInOneLineOnTerminal(lineText);
      text += '\n';
    }
  }

  return text;
}
