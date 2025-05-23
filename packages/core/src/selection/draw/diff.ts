import { isTrue, isUndefined } from 'a-type-of-js';
import { selectionData } from '../data-store';
import { strInTerminalLength } from 'color-pen';

import { getText } from './getText';

/**
 * 分析绘制的数据变化
 */
export function diffDrawData() {
  const { focus, drawData, data, kind } = selectionData;

  for (let i = 0, j = data.length; i < j; i++) {
    // 第一次绘制尚没有数据
    if (isUndefined(drawData[i])) {
      /**  原展示文本信息  */
      const label = data[i].label.toString();
      /**  该信息在终端占用长度  */
      const length = strInTerminalLength(label);

      drawData[i] = {
        index: i,
        text: getText(i),
        length,
        /// 单选状态下始终保持值为 false
        checked: kind === 'radio' ? false : data[i].checked,
        focus: i === focus,
        changed: true,
        show: true,
      };
    }
    // 更替未选择项为选择项
    else if (i === focus) {
      drawData[i].changed = true;
      drawData[i].focus = true;
    } else if (i !== focus && isTrue(drawData[i].focus)) {
      drawData[i].changed = true;
      drawData[i].focus = false;
    }
  }
}
