import { isEmptyString, isFalse } from 'a-type-of-js';
import { dataStore } from '../data-store';

/**
 *
 * 回车键
 *
 * 返回值将作为当前 `userInput` 输入结束的判定依据
 *
 */
export function returnKey() {
  const { enterText, currentIssue, results } = dataStore;
  /** 当前问题*/
  const currentQuestion = currentIssue.text;
  /**
   * 当前答案
   *
   * 在 `required` 为 `false` 时，`enterText` 值可能为 ''
   */
  let currentResult = enterText.join('').trim();

  /// 用户没有输入直接点击的回车键（简易选择模式默认有值）
  if (isEmptyString(currentResult) && currentIssue.required) {
    currentIssue.mustInfo = true;
    return false;
  }
  /**  当前问题不强制用户输入，可为 🈳 🕳️  */
  if (isEmptyString(currentResult) && isFalse(currentIssue.required)) {
    currentResult =
      currentIssue.defaultValue || (currentIssue.tip as string) || '';
  }

  ///  添加当前问题和答案到结果集
  results.push({ q: currentQuestion, r: currentResult });

  return true;
}
