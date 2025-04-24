import { dog } from './../dog';
/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName originQuestion.ts
 *  @CreateDate  周四  04/03/2025
 *  @Description 原始的 🙋 处理
 *
 * 因为在使用多问模式时，发现数据在上一个问询和下一个问询直接存在数据污染，
 * 即使用 `command.data` 将数据进行隔离
 ****************************************************************************/
import draw from './draw';
import userInput from './userInput';
import { _p, cursorLineClear, cursorShow } from 'a-node-tools';
import { QuestionParamDataType } from './types';
import { questionData } from './questionData';
import { originalData } from './originalData';

/**
 *
 * 意外退出回调函数
 */
const unexpectedExit = () => {
  cursorLineClear(true);
  cursorShow();
  _p(` ❌ ${questionData.currentIssue.text} `);
};

/**
 *
 * @param data
 * @param simpleResult
 * @returns
 */
export default async function (
  data: QuestionParamDataType,
  simpleResult = false,
) {
  dog('初始化问题');
  // 保留原始 🙋 （初始化数据）
  originalData.init(data);
  dog('初始化当前问题');
  // 开始问询 （初始化 🙋 ）
  questionData.beforeStart();
  dog('注册意外退出的监听，用于在意外退出时恢复光标即清理已打印内容');
  // 退出的时候
  process.on('exit', unexpectedExit);
  dog('开始绘制问题');
  draw();
  //  等待用户输入
  await Reflect.apply(userInput, questionData, []);
  // 移除监听
  process.removeListener('exit', unexpectedExit);
  cursorLineClear(true);
  cursorShow(); // 在推出时确保没有对光标显隐有副作用
  //  多问模式将返回 questionData.results
  if (questionData.multi) {
    //  返回简单结果
    if (simpleResult) {
      return questionData.results.map(currentValue => currentValue.r);
    } else {
      /**  返回默认复杂结果  */
      return questionData.results;
    }
  } else {
    return questionData.results[0].r;
  }
}
