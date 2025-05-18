import { dog } from '../dog';
import {
  _p,
  cursorAfterClear,
  cursorHide,
  cursorPositionSave,
  cursorPositionUndo,
  cursorShow,
} from 'a-node-tools';
import { draw } from './draw';
import { selectionData } from './data-store';
import { SelectionParamDataType, SelectionResultType } from './types';
import { userInteraction } from './userInteraction';
import { terminalResetStyle } from '@color-pen/static';
import { onResize } from './onResize';
import { pen666, prefixList } from '../utils/info';
import { isUndefined } from 'a-type-of-js';

/**
 *
 * 选择
 *
 * @param data - 选择数据
 * @param resultType - 返回类型
 * @returns
 */
export async function selectionStep<
  T extends SelectionParamDataType,
  U extends 'string' | 'number' | undefined,
>(data: T, resultType?: U): Promise<SelectionResultType<T, U>> {
  process.stdout.removeListener('resize', onResize); /// 移除旧的监听
  process.stdout.on('resize', onResize); // 注册监听终端的尺寸变化
  // 数据初始化
  selectionData.initData(data);
  cursorHide(); // 隐藏光标
  dog('初始绘制问题选项');
  cursorPositionSave();
  draw(); // 初始绘制选择框
  dog('绘制完成，等待用户操作');
  // 等待用户选择
  await userInteraction();
  _p(terminalResetStyle, false); // 重置属性
  process.stdout.removeListener('resize', onResize); /// 移除尺寸变化的事件
  const { resultText, info, focus, kind, drawData } = selectionData;
  cursorShow(); // 恢复光标显示
  cursorPositionUndo(); // 恢复光标位置
  cursorAfterClear(true); // 清理后面的内容

  /**  当前被选中的元素  */
  const checkedList = drawData.filter(e => e.checked);

  if (!selectionData.private) {
    const checkList =
      kind === 'radio' ? [drawData[focus].text] : checkedList.map(e => e.text);
    _p(
      `${prefixList.success()} ${pen666.italic.dim(resultText || info)}: ${pen666(checkList.join('、'))}`,
    );
  }

  const resultString: string | number | (string | number)[] =
      kind === 'radio'
        ? selectionData.data[focus].value
        : checkedList.map(e => selectionData.data[e.index].value),
    resultNumber = kind === 'radio' ? focus : checkedList.map(e => e.index);
  // 返回结果
  const response =
    resultType == 'string' || isUndefined(resultType)
      ? resultString
      : resultNumber;
  return response as SelectionResultType<T, U>;
}
