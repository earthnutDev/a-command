/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName changeCurrentIssue.ts
 *  @CreateDate  周四  04/03/2025
 *  @Description问题初始化中心
 *
 *  - 根据当前问题的进度更新当前问题
 *  - 更新当前问题时初始化当前的问题
 ****************************************************************************/
import { createCurrentIssue } from './data-store';
import { originalData } from './originalData';
import { CurrentIssueType, QuestionDataType } from './types';
import {
  isArray,
  isBusinessEmptyString,
  isEmptyString,
  isString,
} from 'a-type-of-js';

/**
 *
 *  变更当前问题（每次变更会初始化 ）
 *
 
 **/
export default function changeCurrentIssue(this: QuestionDataType) {
  const { multi, progressCount } = this;
  const text = '请使用你自己的问题';
  // 原始问题
  // 当为单问模式直接读取当前问题
  // 如果是多问模式根据当前的 `progressCount` 读取当前的问题
  const _d: number | string | CurrentIssueType =
    multi && isArray(originalData.data)
      ? originalData.data[originalData.data.length + progressCount]
      : (originalData.data as never);
  // 初始化一个空白问题
  const currentIssue = createCurrentIssue();
  /**
   *
   * 混合问题
   *
   * - 如果是 `string` 类型，则直接赋值给 `text`
   * - 如果是 `object` 类型，则混合数据
   */
  Object.assign(currentIssue, isString(_d) ? { text: _d } : _d);

  // 初始化当前问题
  const kind: 0 | 1 = isArray(currentIssue.tip) ? 1 : 0;

  let enterText: string[];

  // kind 为 1 简易选择模式时直接给输入框赋值
  if (kind == 1) {
    enterText = [(currentIssue.tip as string[])[0]];
  } else {
    enterText = [];

    /**  即没有提示有没有 `defaultValue` 值时，不允许显式设置 `required` 为 `false`  */
    if (
      isEmptyString(currentIssue.tip) &&
      isEmptyString(currentIssue.defaultValue)
    ) {
      currentIssue.required = true;
    }

    /**  当 `defaultValue` 值不为空时而 `tip` 值为空时，则将 `tip` 值设置为 `defaultValue`   */
    if (currentIssue.defaultValue !== '' && isEmptyString(currentIssue.tip)) {
      currentIssue.tip = currentIssue.defaultValue;
    }
  }

  currentIssue.text = isBusinessEmptyString(currentIssue.text.toString())
    ? text
    : currentIssue.text;
  /**  初始化用户的输入  */

  this.assign({
    indexOfCursor: 0,
    kind,
    enterText,
    currentIssue,
  });
}
