import { _p, cursorHide } from 'a-node-tools';
import draw from './draw';
import selectionData from './selectionData';
import { SelectionParamDataType } from './types';
import userSelect from './userSelect';
import { t } from 'color-pen';

/**
 *
 * 意外退出回调函数
 *
 *
 */
const unexpectedExit = () =>
  /**
   * 打印意外终止
   *
   */
  _p(`${t}J${t}?25h ❌ ${selectionData.info}\n`);

/**
 *
 * 选择
 *
 * @param data - 选择数据
 * @param resultType - 返回类型
 * @returns
 */
export default async function (
  data: SelectionParamDataType,
  resultType: 'number' | 'string' = 'string',
): Promise<string | number> {
  selectionData.initData(data);

  process.on('exit', unexpectedExit);
  cursorHide();
  draw();
  // 等待用户选择
  await userSelect();
  // 移除监听
  process.removeListener('exit', unexpectedExit);
  const resultString: string | number =
      selectionData.data[selectionData.select],
    resultNumber = selectionData.select;
  // 返回结果
  return resultType == 'string' ? resultString : resultNumber;
}
