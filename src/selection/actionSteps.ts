import { dog } from '../dog';
import { _p, cursorHide, cursorLineClear, cursorShow } from 'a-node-tools';
import draw from './draw';
import { selectionData } from './data-store';
import { SelectionParamDataType } from './types';
import userSelect from './userInteraction';

/**
 *
 * 意外退出回调函数
 *
 *
 */
const unexpectedExit = () => {
  cursorLineClear(true);
  cursorShow();

  _p(` ❌ ${selectionData.info}\n`);
};

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
  // 数据初始化
  selectionData.initData(data);
  dog('注册意外退出执行监听');
  process.on('exit', unexpectedExit); // 监听异常退出
  dog('隐藏光标');
  cursorHide(); // 隐藏光标
  dog('初始绘制问题选项');
  draw(); // 初始绘制选择框
  dog('绘制完成，等待用户操作');
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
