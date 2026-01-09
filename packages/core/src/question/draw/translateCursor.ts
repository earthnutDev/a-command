import { cursorMoveRight } from 'a-node-tools';
import { strInTerminalLength } from 'color-pen';
import { dog } from '../../utils/dog';
import { dataStore } from '../data-store';

/**
 *
 * 光标移动
 *
 * @param printInfo  打印了其他信息，这时候需要触发判断是否挪动光标的位置
 *
 */
export function translateCursor(printInfo: boolean) {
  const { currentIssue, indexOfCursor, enterText } = dataStore;

  const { text, required, mustInfoLen } = currentIssue;

  if (printInfo) {
    return cursorMoveRight(mustInfoLen);
  }

  const enterStr = enterText.slice(0, indexOfCursor).join('');

  const str = text.toString().concat(enterStr);

  const computerLength = strInTerminalLength(str);

  const result = computerLength + 7 + Number(required) * 2;

  /**  理论偏移量   */
  const theoreticalOffset = result % process.stdout.columns;

  dog('用户输入', enterText.join(''));
  dog('光标所在的位置', indexOfCursor);
  dog('实际参与计算的用户输入的文本为', enterStr);
  dog('计算总文本', str);
  dog('计算文本长度', computerLength);
  dog('计算可用长度', result);
  dog('屏幕宽', process.stdout.columns);
  dog('光标偏移量', result % process.stdout.columns);

  cursorMoveRight(theoreticalOffset);
}
