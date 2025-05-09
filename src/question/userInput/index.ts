import { readInput } from 'a-node-tools';
import draw from '../draw';
import { questionData } from '../questionData';
import { returnKey } from './returnKey';
import { leftKey } from './leftKey';
import { fightKey } from './rightKey';
import { delKey } from './delKey';
import { otherKey } from './otherKey';

/**
 *
 * 监听用户键盘输入并处理
 *
 */
export default async function userInput() {
  /**  等待用户输入  */
  await readInput((keyValue: string | undefined, key) => {
    const { kind, currentIssue, enterText } = questionData;
    /**  当为选择模式时的可选项数组  */
    let arr: string[] = [],
      /**  选择模式下可选择项数  */
      len: number = 0,
      /**  可选项模式当前下标  */
      _index: number = 0;
    /**  当前为选择模式而不是输入模式  */
    if (kind !== 0) {
      // 选择模式
      arr = currentIssue.tip as string[];
      len = arr.length - 1;
      _index = arr.indexOf(enterText[0]);
    }
    switch ((key as { name: string }).name) {
      case 'return':
        if (returnKey()) return true;
        break;
      // 键盘左键
      case 'left':
        leftKey(arr, _index, len);
        break;
      // 键盘右键
      case 'right':
        fightKey(arr, _index, len);
        break;
      // 删除键或回退键
      case 'delete':
      case 'backspace':
        delKey();
      // Tab 键
      // eslint-disable-next-line no-fallthrough
      case 'tab':
        break;
      default:
        otherKey(keyValue);
        break;
    }
    draw(); // 重绘
    return false;
  });
}
