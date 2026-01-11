/**
 * @file index.ts
 * @description xx
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module Selection
 * @since 2026-01-10 11:03
 * @lastModified 2026-01-11 15:11
 **/

import { csi } from '@color-pen/static';
import { debounce } from 'a-js-tools';
import { _p } from 'a-node-tools';
import { cyanPen, strInOneLineOnTerminal } from 'color-pen';
import { prefixList } from '../../info';
import { dun } from '../../utils/dog';
import { ellipsis } from '../../utils/pen';
import { selectionData } from '../data-store';
import { diffDrawData } from './diff';
import { getText } from './getText';
import { printContent } from './printContent';
import { printInfo } from './printInfo';

const _draw = () => {
  diffDrawData(); // 计算差异
  canIShow(); // 计算单项是否允许被展示
  const { info, mustInfo, renderInfo, focus, data } = selectionData;
  const { rows, allowBelow, size } = renderInfo;
  const { width } = size;

  /**  渲染的串  */
  let text = `${csi}${width}D`;
  // 打印出安全区
  text += '\n'.repeat(rows);
  // 向上移动到原位置
  text += `${csi}${rows}A`;
  // 清理光标之后的内容
  text += `${csi}J`;
  // 打印标题
  text += strInOneLineOnTerminal(`${prefixList.current()}  ${info}  \n\n`);
  text += printContent(); // 打印主区域
  // 清理光标之后的内容（这里没有必要，但是我是闲的）
  text += `${csi}J`;

  if (allowBelow) {
    if (mustInfo) {
      text += printInfo();
    } else if (data[focus].tip) {
      text += '\n';
      text += strInOneLineOnTerminal(`${cyanPen(data[focus].tip)}`);
    } else {
      text += '\n';
    }
    text += '\n';
  }

  if (dun) {
    // 向上移动到原位置
    text += `${csi}${width}D${csi}${rows}A`;
    // text += `${csi}2C${csi}8m`; // 输出无色文字
  }
  _p(text, false);
};

/** ## 绘制 */
export const draw = debounce(_draw, 66);

/** ## 尺寸变化时的绘制  */
export const resizeDraw = debounce(_draw, 600);
/**  我可以展示不？  */
export function canIShow() {
  const { drawData, renderInfo, focus } = selectionData;

  const { renderRows } = renderInfo;

  const len = drawData.length;

  if (len === renderRows) {
    drawData.forEach(e => (e.show = true));
    return;
  }
  /**  最大下标值  */
  const maxIndex = len - 1;

  /**  上下各渲染一半的场景  */
  const halfRenderCount = Math.floor((renderRows - 1) / 2);
  /**  是否为偶数条渲染  */
  const isEvenNumbered = !(renderRows & 1);
  /**  最小渲染的数  */
  let minRenderIndex = isEvenNumbered
    ? focus - halfRenderCount - 1
    : focus - halfRenderCount;
  minRenderIndex = minRenderIndex < 0 ? 0 : minRenderIndex;
  /**  最大渲染的数  */
  let maxRenderIndex = renderRows + minRenderIndex - 1;

  // 最大值超出使用范围
  if (maxRenderIndex > maxIndex) {
    maxRenderIndex = maxIndex;
    minRenderIndex = maxRenderIndex - renderRows + 1;
  }

  drawData.forEach(e => {
    const { index } = e;
    if (index > maxRenderIndex || index < minRenderIndex) {
      e.show = false;
    } else if (
      (index === maxRenderIndex && index !== maxIndex) ||
      (index === minRenderIndex && index !== 0)
    ) {
      e.show = true;
      e.text = ellipsis;
    } else if (e.text === ellipsis) {
      e.show = true;
      e.text = getText(index);
    } else {
      e.show = true;
    }
  });
}
