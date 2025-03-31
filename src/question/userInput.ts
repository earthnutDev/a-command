import { _p, cursorShow, readInput } from 'a-node-tools';
import draw from './draw';
import questionData from './questionData';
import pen, { t } from 'color-pen';

/**
 *
 * 监听用户键盘输入并处理
 */
export default async function () {
  await readInput((keyValue: string | undefined, key) => {
    const { type, currentIssue, userInput, results, multi } = questionData;
    /** 当前问题  */
    const currentQuestion = currentIssue.text,
      /** 当前答案  */
      currentResult = userInput.join('');
    let arr: string[] = [],
      len: number = 0,
      _index: number = 0;
    if (type != 0) {
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
         */
        if (userInput.length == 0) {
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
