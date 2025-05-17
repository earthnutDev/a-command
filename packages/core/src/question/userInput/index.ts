import {
  cursorLineClear,
  cursorPositionUndo,
  readInput,
  ReadInputResult,
} from 'a-node-tools';
import { draw } from '../draw';
import { returnKey } from './returnKey';
import { leftKey } from './leftKey';
import { fightKey } from './rightKey';
import { delKey } from './delKey';
import { otherKey } from './otherKey';
import { QuestionDataType } from '../types';
import { dataStore } from '../data-store';
import { dog } from '../../dog';
import { isFalse } from 'a-type-of-js';

/**
 *
 * 监听用户键盘输入并处理
 *
 */
export async function userInput(
  this: QuestionDataType,
): Promise<ReadInputResult> {
  /**  等待用户输入  */
  const result = await readInput((keyValue: string | undefined, key) => {
    const { kind, currentIssue, enterText } = this;
    /**  当为选择模式时的可选项数组  */
    let arr: string[] = [],
      /**  选择模式下可选择项数  */
      len: number = 0,
      /**  可选项模式当前下标  */
      _index: number = 0,
      reDraw = true;
    /**  当前为选择模式而不是输入模式  */
    if (kind !== 0) {
      // 选择模式
      arr = currentIssue.tip as string[];
      len = arr.length - 1;
      _index = arr.indexOf(enterText[0]);
    }
    dog('\n 用户使用了', keyValue, key);
    switch ((key as { name: string }).name) {
      case 'return':
        if (returnKey()) {
          reDraw = false;
          return true;
        }
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
        /// 使用 ctrl 键时可能触发输入功能符号，如：`\u0003` 的 `Ctrl + C`
        /// 需要过滤dian
        if (isFalse(key?.ctrl)) otherKey(keyValue);
        else reDraw = false;
        break;
    }
    if (reDraw) draw(); // 重绘
    return false;
  });

  // 使用 Ctrl + c 但是当前问题禁止退出
  if (result.isSIGINT) {
    if (isFalse(returnKey())) {
      cursorPositionUndo();
      cursorLineClear(true);
      draw();
      return await Reflect.apply(userInput, dataStore, []);
    }
  }

  return result;
}
