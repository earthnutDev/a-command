import {
  isBoolean,
  isEmptyString,
  isFalse,
  isRegExp,
  isString,
  isTrue,
  isUndefined,
  isZero,
} from 'a-type-of-js';
import { cyanPen, greenPen } from 'color-pen';
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
  const { len, minLen, maxLen, verify } = currentIssue;
  const strLen = currentResult.length;
  if (isZero(dataStore.kind)) {
    // 用户有输入检验输入
    if (verify.length > 0) {
      for (const i of verify) {
        /**  校验  */
        if (
          // 允许强验证
          [isUndefined, isFalse].some(e => e(i.warn)) &&
          // 正则类型正确
          isRegExp(i.reg) &&
          // 提示类型正确
          isString(i.info) &&
          // 是否反向验证
          [isUndefined, isBoolean].some(e => e(i.inverse))
        ) {
          i.reg.lastIndex = 0;
          const result = i.reg.test(currentResult);
          if ((isTrue(i.inverse) && result) || (!i.inverse && !result)) {
            return !1;
          }
        }
      }
    }
    if (!isZero(len) && strLen !== len) {
      currentIssue.mustInfo = `您输入的长度 ${greenPen(strLen)} 不符合要求值 ${cyanPen(len)}`;
      return !1;
    }
    if (!isZero(minLen) && strLen < minLen) {
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
