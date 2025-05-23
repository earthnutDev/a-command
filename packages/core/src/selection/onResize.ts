import { debounce } from 'a-js-tools';
import { selectionData } from './data-store';
import { terminalResetStyle } from '@color-pen/static';
import { _p, cursorAfterClear } from 'a-node-tools';
import { outputSafeZone } from './outputSafeZone';
import { draw, resizeDraw } from './draw';

/**  当终端发生尺寸变化  */
export const onResize = debounce(() => {
  const { drawData, renderInfo } = selectionData;
  const height = renderInfo.size.height;
  // 由于在绘制的最后将光标的位置放到了保存位置，导致尺寸变化后出现了已有打印成空
  drawData.length = 0;
  _p(terminalResetStyle, false); // 重置属性
  cursorAfterClear();
  outputSafeZone();
  if (process.stdout.rows !== height) {
    resizeDraw();
  } else {
    draw();
  }
}, 33);
