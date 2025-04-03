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
import { _p } from 'a-node-tools';
import { QuestionParamDataType } from './types';
import { t } from 'color-pen';
import { questionData } from './questionData';
import { originalData } from './originalData';

const { stdout } = process;
/**
 *
 * 意外退出回调函数
 */
const unexpectedExit = () =>
  _p(
    `${t}${stdout.columns}D${t}J${t}?25h ❌ ${questionData.currentIssue.text} `,
  );

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
  // 保留原始 🙋 （初始化数据）
  originalData.init(data);
  // 开始问询 （初始化 🙋 ）
  questionData.beforeStart();
  // 退出的时候
  process.on('exit', unexpectedExit);

  draw();
  /** 等待用户输入 */
  await Reflect.apply(userInput, questionData, []);
  /**
   *
   *  移除监听
   */
  process.removeListener('exit', unexpectedExit);
  _p(`\r${t}2K`, false); // 清除当前行
  /**  多问模式将返回 questionData.results  */
  if (questionData.multi) {
    /**  返回简单结果  */
    if (simpleResult) {
      return questionData.results.map(
        (currentValue: unknown) => (currentValue as { r: string; t: string }).r,
      );
    } else {
      /**  返回默认复杂结果  */
      return questionData.results;
    }
  } else {
    const { currentIssue } = questionData;
    /**  必须输入值时返回用户的值  */
    if (currentIssue.required) {
      return questionData.userInput.join('');
    } else {
      /**  非必须输入值时返回默认值  */
      return currentIssue.defaultValue || currentIssue.tip;
    }
  }
}
