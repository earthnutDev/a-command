import { _p } from 'a-node-tools';
import { selectionData } from '../data-store';
import { cyanPen, strInOneLineOnTerminal } from 'color-pen';
import { diffDrawData } from './diff';
import { prefixList } from '../../utils/info';
import { debounce } from 'a-js-tools';
import { dun } from '../../dog';
import { printInfo } from './printInfo';
import { canIShow } from './canIShow';
import { csi } from '@color-pen/static';
import { printContent } from './printContent';

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

/**
 *
 * 绘制
 *
 */
export const draw = debounce(_draw, 66);

/**  尺寸变化时的绘制  */
export const resizeDraw = debounce(_draw, 600);
