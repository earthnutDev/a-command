import { isEmptyString, isFalse } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { cyanPen, greenPen } from 'color-pen';

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
  const { len, minLen, maxLen, verify } = currentIssue;
  const strLen = currentResult.length;
  if (dataStore.kind === 0) {
    // 用户有输入检验输入
    if (verify.length > 0) {
      for (const i of verify) {
        i.reg.lastIndex = 0;
        if (isFalse(i.reg.test(currentResult))) {
          return !1;
        }
      }
    }
    if (len !== 0 && strLen !== len) {
      currentIssue.mustInfo = `您输入的长度 ${greenPen(strLen)} 不符合要求值 ${cyanPen(len)}`;
      return !1;
    }
    if (minLen !== 0 && strLen < minLen) {
      currentIssue.mustInfo = `您输入的长度 ${greenPen(strLen)} 小于最低要求${cyanPen(minLen)}`;
      return !1;
    }

    if (maxLen > minLen && strLen > maxLen) {
      currentIssue.mustInfo = `您输入的长度 ${greenPen(strLen)} 大于最低要求${cyanPen(maxLen)}`;
      return !1;
    }
  }

  /**  当前问题不强制用户输入，可为 🈳 🕳️  */
  if (isEmptyString(currentResult) && isFalse(currentIssue.required)) {
    currentResult =
      currentIssue.defaultValue || (currentIssue.tip as string) || '';
  }

  ///  添加当前问题和答案到结果集
  results.push({ q: currentQuestion, r: currentResult });

  return !0;
}
