import { _p, cursorShow, readInput } from 'a-node-tools';
import draw from './draw';
import pen, { t } from 'color-pen';
import { questionData } from './questionData';

/**
 *
 * 监听用户键盘输入并处理
 *
 */
export default async function userInput() {
  /**  等待用户输入  */
  await readInput((keyValue: string | undefined, key) => {
    const { type, currentIssue, userInput, results, multi } = questionData;
    /** 当前 🙋 */
    const currentQuestion = currentIssue.text;
    /** 当前答案  */
    let currentResult = userInput.join('');
    /**  当为选择模式时的可选项数组  */
    let arr: string[] = [],
      /**  选择模式下可选择项数  */
      len: number = 0,
      /**  可选项模式当前下标  */
      _index: number = 0;
    /**  当前为选择模式而不是输入模式  */
    if (type !== 0) {
      // 选择模式
      arr = currentIssue.tip as string[];
      len = arr.length - 1;
      _index = arr.indexOf(userInput[0]);
    }
    switch ((key as { name: string }).name) {
      case 'return':
        /**
         *
         *  用户没有输入直接点击的回车键
         *
         *  在 `type: 1` 的
         *
         */
        if (userInput.length == 0 && currentIssue.required) {
          /**  提示用户输入 👆 */
          _p(
            ' '
              .repeat(2)
              .concat(pen.red(currentIssue.text))
              .concat(' '.repeat(3))
              .concat(`${t}5m👆${t}m${t}1A`),
            false,
          );
          break;
        }
        /**  当前问题不强制用户输入，可为 🈳 🕳️  */
        if (userInput.length == 0 && currentIssue.required === false) {
          currentResult =
            currentIssue.defaultValue || (currentIssue.tip as string);
        }

        /**  添加当前 🙋 和答案到结果集  */
        results.push({ q: currentQuestion, r: currentResult });
        /**
         *
         * 打印结果
         */
        _p(`${t}1A${t}2K${t}J`, false);
        // 私密模式则不打印
        if (!currentIssue.private) {
          _p(
            `👌 ${currentIssue.resultText || currentQuestion}: ${pen.random(currentIssue.type == 'text' ? currentResult : currentResult.replace(/./gm, '*'))}`,
          );
        }
        cursorShow();
        /**  在非多问模式和多问模式已达到最后一轮🙋 ✅ ，直接返回 */
        if (!multi || !++questionData.progressCount) {
          return true;
        }
        break;
      /**
       *
       *   键盘左键
       */
      case 'left':
        if (type == 0) {
          questionData.indexOfCursor =
            questionData.indexOfCursor == 0
              ? userInput.length
              : questionData.indexOfCursor - 1;
        } else {
          userInput[0] = arr[_index == 0 ? len : _index - 1];
        }
        break;
      /**
       *
       *  键盘右键
       */
      case 'right':
        if (type == 0) {
          questionData.indexOfCursor =
            questionData.indexOfCursor == questionData.userInput.length
              ? 0
              : questionData.indexOfCursor + 1;
        } else {
          userInput[0] = arr[_index == len ? 0 : _index + 1];
        }
        break;
      /**
       *
       *  删除键或回退键
       */
      case 'delete':
      case 'backspace': {
        if (questionData.indexOfCursor != 0) {
          userInput.splice(questionData.indexOfCursor - 1, 1);
          questionData.indexOfCursor--;
        }
      }
      /**
       *
       *  Tab 键
       */
      // eslint-disable-next-line no-fallthrough
      case 'tab':
        break;
      default:
        if (keyValue != undefined && type == 0) {
          if (questionData.indexOfCursor == userInput.length) {
            userInput.push(keyValue as never);
          } else {
            userInput.splice(questionData.indexOfCursor, 0, keyValue as never);
          }
          questionData.indexOfCursor += 1;
        }
        break;
    }
    /**
     *
     *  重绘
     */
    draw();
    return false;
  });
}
