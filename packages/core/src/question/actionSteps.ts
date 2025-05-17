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
  cursorPositionSave,
  cursorPositionUndo,
  cursorShow,
} from 'a-node-tools';
import { QuestionParamDataType } from './types';
import { dataStore } from './data-store';
import { originalData } from './originalData';
import { onResize } from './onResize';
import { pen666, prefixList } from '../utils/info';

/**
 *
 * @param data
 * @param simpleResult
 * @returns
 */
export async function questionStep(
  data: QuestionParamDataType,
  simpleResult = false,
) {
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
    cursorPositionSave(); // 保留光标位置
    draw();
    //  等待用户输入
    await Reflect.apply(userInput, dataStore, []);
    cursorPositionUndo(); // 恢复坐标
    cursorShow();
    cursorAfterClear();
    __p('m');
    const { currentIssue, results } = dataStore;
    const currentText = pen666(currentIssue.resultText || currentIssue.text);
    const currentResult = results[results.length - 1].r;
    // 私密模式则不打印
    if (!currentIssue.private) {
      _p(
        `${prefixList.success()} ${currentText}: ${currentIssue.type === 'text' ? currentResult : currentResult.replace(/./gm, '*')}`,
      );
    }
    ++dataStore.progressCount; // 进度更新
  } while (dataStore.multi && dataStore.progressCount !== 0);

  process.stdout.removeListener('resize', onResize); /// 移除尺寸变化的事件
  //  多问模式将返回 questionData.results
  if (dataStore.multi) {
    //  返回简单结果
    if (simpleResult) {
      return dataStore.results.map(currentValue => currentValue.r);
    } else {
      /**  返回默认复杂结果  */
      return dataStore.results;
    }
  } else {
    return dataStore.results[0].r;
  }
}
