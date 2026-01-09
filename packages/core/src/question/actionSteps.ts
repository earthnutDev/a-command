import { __p, cursorAfterClear, cursorMoveUp, cursorShow } from 'a-node-tools';
import { isArray, isTrue, isUndefined, isZero } from 'a-type-of-js';
import { dog } from '../utils/dog';
/**
 *  @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @packageDocumentation
 * @module  a-command
 *  @file originQuestion.ts
 *  @since 04/03/2025
 *  @description 原始的问题处理
 *
 * 因为在使用多问模式时，发现数据在上一个问询和下一个问询直接存在数据污染，
 * 即使用 `command.data` 将数据进行隔离
 **/
import { ERROR, pen666, SUCCESS } from '../utils/info';
import { dataStore } from './data-store';
import { draw } from './draw';
import { onResize } from './onResize';
import { originalData } from './originalData';
import { outputSafeZone } from './outputSafeZone';
import { QuestionParamDataType, QuestionReturnType } from './types';
import { userInput } from './userInput';

/**
 *
 * @param data
 * @param simpleResult
 * @returns
 */
export async function actionStep<
  T extends QuestionParamDataType,
  U extends boolean | undefined,
>(data: T, simpleResult: U): Promise<QuestionReturnType<T, U>> {
  process.stdout.removeListener('resize', onResize); /// 移除旧的监听
  process.stdout.on('resize', onResize); // 注册监听终端的尺寸变化

  dog('初始化问题');
  // 保留原始问题（初始化数据）
  originalData.init(data);
  dog('初始化当前问题');
  // 开始问询 （初始化问题）
  dataStore.beforeStart();
  dog('开始绘制问题');
  do {
    outputSafeZone(); // 输出安全区
    draw();
    //  等待用户输入
    try {
      await Reflect.apply(userInput, dataStore, []);
    } catch (error) {
      dog.error(error);
    }
    const { currentIssue, results } = dataStore;
    if (!isZero(currentIssue.row)) {
      // 向上移动光标
      cursorMoveUp(currentIssue.row, true);
      currentIssue.row = 0;
    }
    __p('m'); /// 重置属性
    cursorShow();
    cursorAfterClear(true);
    /**  结果展示文本  */
    const currentText = currentIssue.resultText || currentIssue.text;
    /**  当前问题的返回值  */
    const currentResult = results[results.length - 1].r;

    // 私密模式则不打印
    if (!currentIssue.private) {
      /// 用户使用按键欲跳过该项
      if (isUndefined(currentResult))
        ERROR(currentIssue.errorText || currentText);
      else
        SUCCESS(
          `${pen666(currentText)}: ${currentIssue.type === 'text' ? currentResult : currentResult.replace(/./gm, '*')}`,
        );
    }
    ++dataStore.progressCount; // 进度更新
  } while (dataStore.progressCount < 0);

  process.stdout.removeListener('resize', onResize); /// 移除尺寸变化的事件
  // 下面代码块中仅作退出属性重置双保险，并无作用
  {
    __p('m'); /// 重置属性
    cursorShow();
    cursorAfterClear(true);
  }
  //  多问模式将返回 questionData.results
  return (
    dataStore.multi
      ? isTrue(simpleResult) && isArray(data)
        ? dataStore.results.map(currentValue => currentValue.r)
        : //  返回简单结果
          dataStore.results
      : dataStore.results[0].r
  ) as QuestionReturnType<T, U>;
}
