import { cutoffStringWithChar, strInTerminalLength } from 'color-pen';
import { selectionData } from '../data-store';
import { ellipsis } from '../../utils/info';

/**  计算文本展示  */
export function getText(index: number): string {
  const { data } = selectionData;
  /**  可用列数  */
  const availableColumns = process.stdout.columns - 7;
  /**  超长文本可用列数  */
  const extraLongAvailableColumns = availableColumns - 3;
  /**  原展示文本信息  */
  const label = data[index].label.toString();
  /**  该信息在终端占用长度  */
  const length = strInTerminalLength(label);
  /**  计算最终的渲染值  */
  return length <= availableColumns
    ? label
    : cutoffStringWithChar(label, extraLongAvailableColumns, false).concat(
        ellipsis,
      );
}
