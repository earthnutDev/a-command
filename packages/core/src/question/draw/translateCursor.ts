import { cursorMoveRight } from 'a-node-tools';
import { strInTerminalLength } from 'color-pen';
import { dataStore } from '../data-store';
import { dog } from '../../dog';

/**
 *
 * 光标移动
 *
 */
export function translateCursor() {
  const { currentIssue, indexOfCursor, enterText } = dataStore;

  const enterStr = enterText.slice(0, indexOfCursor).join('');

  const str = currentIssue.text.toString().concat(enterStr);

  const computerLength = strInTerminalLength(str);

  const result = computerLength + 7 + Number(currentIssue.required) * 2;

  dog('用户输入', enterText.join(''));
  dog('光标所在的位置', indexOfCursor);
  dog('实际参与计算的用户输入的文本为', enterStr);
  dog('计算总文本', str);
  dog('计算文本长度', computerLength);
  dog('计算可用长度', result);
  dog('屏幕宽', process.stdout.columns);
  dog('光标偏移量', result % process.stdout.columns);

  cursorMoveRight(result % process.stdout.columns);
}
