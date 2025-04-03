/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName changeCurrentIssue.ts
 *  @CreateDate  周四  04/03/2025
 *  @Description 🙋 初始化中心
 *
 *  - 根据当前问题的进度更新当前 🙋
 *  - 更新当前问题时初始化当前的 🙋
 ****************************************************************************/
import { originalData } from './originalData';
import { CurrentIssueType, QuestionDataType } from './types';
import { isString } from 'a-type-of-js';

/**
 *
 *  变更当前 🙋 （每次变更会初始化 ）
 *
 
 **/
export default function changeCurrentIssue(this: QuestionDataType) {
  const { multi, progressCount } = this;
  // 原始 🙋
  // 当为单问模式直接读取当前 🙋
  // 如果是多问模式根据当前的 `progressCount` 读取当前的 🙋
  const _d: string | CurrentIssueType = multi
    ? (originalData.data as [])[
        (originalData.data as []).length + progressCount
      ]
    : (originalData.data as string);
  // 初始化一个空白 🙋
  const currentIssue: CurrentIssueType = {
    text: 'Please change to your own question',
    tip: '',
    type: 'text',
    private: false,
    resultText: '',
    required: true,
    defaultValue: '',
  };
  /**
   *
   * 混合问题
   *
   * - 如果是 `string` 类型，则直接赋值给 `text`
   * - 如果是 `object` 类型，则混合数据
   */
  Object.assign(currentIssue, isString(_d) ? { text: _d } : _d);

  // 初始化当前 🙋
  const type: 0 | 1 = Array.isArray(currentIssue.tip) ? 1 : 0;

  /**  即没有提示有没有 `defaultValue` 值时，不允许显式设置 `required` 为 `false`  */
  if (currentIssue.tip === '' && currentIssue.defaultValue === '') {
    currentIssue.required = true;
  }

  /**  当 `defaultValue` 值不为空时而 `tip` 值为空时，则将 `tip` 值设置为 `defaultValue`   */
  if (currentIssue.defaultValue !== '' && currentIssue.tip === '') {
    currentIssue.tip = currentIssue.defaultValue;
  }

  /**  初始化用户的输入  */
  const userInput = type == 0 ? [] : [(currentIssue.tip as unknown[])[0]];

  this.assign({
    indexOfCursor: 0,
    cursorTranslate: 0,
    type,
    userInput,
    currentIssue,
  });
}
