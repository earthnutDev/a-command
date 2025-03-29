import questionData, { originalData } from './questionData';
import draw from './draw';
import userInput from './userInput';
import { _p } from 'a-node-tools';
import { QuestionParamDataType } from './types';
import { t } from 'color-pen';

const { stdout } = process;
/** unexpected exit
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
  // 保留原始问题 （初始化数据）
  originalData.init(data);
  // 退出的时候
  process.on('exit', unexpectedExit);

  draw();
  /** 等待用户输入 */
  await userInput();
  /** Remove listening
   *
   *  移除监听
   */
  process.removeListener('exit', unexpectedExit);
  _p(`${t}2K`, false);
  if (questionData.multi) {
    if (simpleResult) {
      return questionData.results.map(
        (currentValue: unknown) => (currentValue as { r: string; t: string }).r,
      );
    } else {
      return questionData.results;
    }
  } else {
    return questionData.userInput.join('');
  }
}
