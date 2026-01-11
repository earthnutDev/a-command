import { terminalResetStyle } from '@color-pen/static';
import { debounce } from 'a-js-tools';
import { _p, cursorAfterClear, cursorHide, cursorShow } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { ERROR, SUCCESS } from '../info';
import { commandData } from '../utils/commandData';
import { dog } from '../utils/dog';
import { pen666 } from '../utils/pen';
import { selectionData } from './data-store';
import { draw, resizeDraw } from './draw';
import { outputSafeZone } from './outputSafeZone';
import { SelectionParamDataType, SelectionResultType } from './types';
import { userInteraction } from './userInteraction';

/**
 * 选择的核心逻辑，通过 commandData 来管理数据及执行的顺序
 * @param data
 * @param resultType
 */
export async function core<
  R extends PropertyKey,
  T extends SelectionParamDataType<R>,
  U extends 'string' | 'number' | undefined,
>(data: T, resultType?: U): Promise<SelectionResultType<R, T, U>> {
  const uniKey = Symbol('selection');
  /**
   * 返回一个 promise
   */
  return new Promise((resolve, reject) => {
    /**
     * 注册数据到数据仓中，保证每一个注册的 selection 数据都是独立的
     */
    commandData.on(uniKey, async () => {
      try {
        /**
         * 使用原始定义的 selection 方法执行并返回结果
         */
        const result = (await selectionStep<R, T, U>(
          data,
          resultType,
        )) as SelectionResultType<R, T, U>;

        commandData.remove(uniKey); // 执行下一个 selection
        resolve(result);
      } catch (error) {
        dog.error(error);
        commandData.remove(uniKey); // 执行下一个 selection
        reject();
      }
    });
  });
}

/**
 *
 * 选择执行步进
 *
 * @param data - 选择数据
 * @param resultType - 返回类型
 * @returns
 */
async function selectionStep<
  R extends PropertyKey,
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

  const resultString: PropertyKey | PropertyKey[] =
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
