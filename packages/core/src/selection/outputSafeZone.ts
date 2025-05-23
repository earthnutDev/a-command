import { selectionData } from './data-store';
import { getMaxRows } from './getMaxRows';

/**
 *
 * 输出安全区
 */
export function outputSafeZone() {
  const { data, renderInfo, maxRows } = selectionData;

  const [width, height] = [process.stdout.columns, process.stdout.rows];
  /**  待渲染的问题数  */
  const len = data.length;
  // 终端的尺寸
  renderInfo.size = {
    width,
    height,
  };
  /**  最终渲染的总行数  */
  const rows = (renderInfo.rows = Math.max(
    Math.min(len + 4, getMaxRows(false), maxRows),
    5,
  ));
  /**  是否显示地下的空白部分  */
  const allowBelow = (renderInfo.allowBelow =
    getMaxRows() > data.length || rows > 6);
  /**  其他部分的渲染行数  */
  const otherInfoRows = (renderInfo.otherInfoRows = allowBelow ? 4 : 2);
  /**  问题选项的渲染行数  */
  renderInfo.renderRows = rows - otherInfoRows;
}
