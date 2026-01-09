import { terminalResetStyle } from '@color-pen/static';
import { _p, cursorAfterClear, cursorHide, cursorShow } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { ERROR, pen666, SUCCESS } from '../info/info';
import { dog } from '../utils/dog';
import { selectionData } from './data-store';
import { draw } from './draw';
import { onResize } from './onResize';
import { outputSafeZone } from './outputSafeZone';
import { SelectionParamDataType, ValueExtendsType } from './types';
import { userInteraction } from './userInteraction';

/**
 *
 * 选择
 *
 * @param data - 选择数据
 * @param resultType - 返回类型
 * @returns
 */
export async function selectionStep<
  R extends ValueExtendsType,
  T extends SelectionParamDataType<R>,
  U extends 'string' | 'number' | undefined,
>(data: T, resultType?: U) {
  process.stdout.removeListener('resize', onResize); /// 移除旧的监听
  process.stdout.on('resize', onResize); // 注册监听终端的尺寸变化
  /// 没有可用的有效选择项
  if (selectionData.initData<R>(data)) return undefined;
  cursorHide(); // 隐藏光标
  dog('初始绘制问题选项');
  outputSafeZone();
  draw(); // 初始绘制选择框
  dog('绘制完成，等待用户操作');
  // 等待用户选择
  const exit = await userInteraction();
  _p(terminalResetStyle, false); // 重置属性
  process.stdout.removeListener('resize', onResize); /// 移除尺寸变化的事件
  const { resultText, info, focus, kind, drawData, errorText } = selectionData;
  cursorShow(); // 恢复光标显示
  cursorAfterClear(true); // 清理后面的内容

  /**  意外退出  */
  if (exit) {
    if (!selectionData.private) ERROR(errorText || resultText || info);
    return undefined;
  }

  /**  当前被选中的元素  */
  const checkedList = drawData.filter(e => e.checked);

  if (!selectionData.private) {
    const checkList =
      kind === 'radio' ? [drawData[focus].text] : checkedList.map(e => e.text);
    SUCCESS(
      `${pen666.italic.dim(resultText || info)}: ${pen666(checkList.join('、'))}`,
    );
  }

  const resultString: ValueExtendsType | ValueExtendsType[] =
      kind === 'radio'
        ? selectionData.data[focus].value
        : checkedList.map(e => selectionData.data[e.index].value),
    resultNumber = kind === 'radio' ? focus : checkedList.map(e => e.index);
  // 返回结果
  const response =
    resultType == 'string' || isUndefined(resultType)
      ? resultString
      : resultNumber;
  return response;
}
