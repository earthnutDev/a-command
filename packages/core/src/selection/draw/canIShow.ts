import { ellipsis } from '../../utils/info';
import { selectionData } from '../data-store';
import { getText } from './getText';

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
