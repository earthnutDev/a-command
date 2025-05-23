import { dog } from './../dog';
/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName originQuestion.ts
 *  @CreateDate  周四  04/03/2025
 *  @Description 原始的问题处理
 *
 * 因为在使用多问模式时，发现数据在上一个问询和下一个问询直接存在数据污染，
 * 即使用 `command.data` 将数据进行隔离
 ****************************************************************************/
import { draw } from './draw';
import { userInput } from './userInput';
import {
  __p,
  _p,
  cursorAfterClear,
  cursorMoveUp,
  cursorShow,
} from 'a-node-tools';
import { QuestionParamDataType, QuestionReturnType } from './types';
import { dataStore } from './data-store';
import { originalData } from './originalData';
import { onResize } from './onResize';
import { pen666, prefixList } from '../utils/info';
import { isArray, isTrue, isUndefined } from 'a-type-of-js';
import { hexPen } from 'color-pen';
import { outputSafeZone } from './outputSafeZone';

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
    if (currentIssue.row !== 0) {
      // 向上移动光标
      cursorMoveUp(currentIssue.row, true);
      currentIssue.row = 0;
    }
    cursorShow();
    cursorAfterClear(true);
    __p('m'); /// 重置属性
    const currentText = pen666(currentIssue.resultText || currentIssue.text);
    const currentResult = results[results.length - 1].r;

    // 私密模式则不打印
    if (!currentIssue.private) {
      if (isUndefined(currentResult)) {
        _p(`${prefixList.error()} ${hexPen('#a30').italic(currentText)}`);
      } else {
        _p(
          `${prefixList.success()} ${currentText}: ${currentIssue.type === 'text' ? currentResult : currentResult.replace(/./gm, '*')}`,
        );
      }
    }
    ++dataStore.progressCount; // 进度更新
  } while (dataStore.multi && dataStore.progressCount !== 0);

  process.stdout.removeListener('resize', onResize); /// 移除尺寸变化的事件
  //  多问模式将返回 questionData.results
  if (dataStore.multi) {
    //  返回简单结果
    if (isTrue(simpleResult) && isArray(data)) {
      return dataStore.results.map(
        currentValue => currentValue.r,
      ) as QuestionReturnType<T, U>;
    } else {
      /**  返回默认复杂结果  */
      return dataStore.results as QuestionReturnType<T, U>;
    }
  } else {
    return dataStore.results[0].r as QuestionReturnType<T, U>;
  }
}
