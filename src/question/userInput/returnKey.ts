import {
  _p,
  cursorAfterClear,
  cursorLineClear,
  cursorMoveUp,
  cursorShow,
} from 'a-node-tools';
import { questionData } from '../questionData';
import { pen } from 'color-pen';
import { terminalResetStyle } from '@color-pen/static';

/**
 *
 * 回车键
 *
 * 返回值将作为当前 `userInput` 输入结束的判定依据
 *
 */
export function returnKey() {
  const { enterText, currentIssue, results, multi } = questionData;
  /** 当前 🙋 */
  const currentQuestion = currentIssue.text;
  /**
   * 当前答案
   *
   * 在 `required` 为 `false` 时，`enterText` 值可能为 ''
   */
  let currentResult = enterText.join('').trim();

  /**
   *
   *  用户没有输入直接点击的回车键
   *
   *  在 `kind: 1` 的
   *
   */
  if (currentResult === '' && currentIssue.required) {
    const requiredStr = currentIssue.required ? pen.hide('*') : '';
    /**  提示用户输入 👆 */
    _p(
      ' '
        .repeat(2)
        .concat(requiredStr)
        .concat(pen.red(currentIssue.text))
        .concat(requiredStr)
        .concat(' '.repeat(3)),
      false,
    );
    // 打印手指
    _p(pen.blink`👆`.concat(terminalResetStyle), false);
    // 光标上移
    cursorMoveUp();
    return false;
  }
  /**  当前问题不强制用户输入，可为 🈳 🕳️  */
  if (currentResult === '' && currentIssue.required === false) {
    currentResult = currentIssue.defaultValue || (currentIssue.tip as string);
  }

  /**  添加当前 🙋 和答案到结果集  */
  results.push({ q: currentQuestion, r: currentResult });
  // 最后的选择使用了 enter 键，默认会下移一行，这里不知道哪一个版本删除了光标上移导致最后的结果有问题
  cursorMoveUp();
  // 清空当前行以展示结果
  cursorLineClear(true);
  // 清理航末
  cursorAfterClear();
  // 私密模式则不打印
  if (!currentIssue.private) {
    _p(
      `👌 ${currentIssue.resultText || currentQuestion}: ${pen.brightGreen(currentIssue.type === 'text' ? currentResult : currentResult.replace(/./gm, '*'))}`,
    );
  }
  cursorShow(); // 显示光标
  //  在非多问模式和多问模式已达到最后一轮🙋 ✅ ，直接返回
  if (!multi || !++questionData.progressCount) {
    return true;
  }
  return false;
}
