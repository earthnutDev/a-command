import { esc } from '@color-pen/static';
import { isFalse, isTrue } from 'a-type-of-js';
import { draw } from '../draw';
import { QuestionDataType } from '../types';
import { delKey } from './delKey';
import { leftKey } from './leftKey';
import { otherKey } from './otherKey';
import { returnKey } from './returnKey';
import { fightKey } from './rightKey';
import { dog } from '../../dog';
import { __p, ReadInputKey } from 'a-node-tools';

/**    */
export function userInputCn(_this: QuestionDataType) {
  return (keyValue: string | undefined, key: ReadInputKey) => {
    const { kind, currentIssue, enterText, results } = _this;
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
        break;
      case 'escape': {
        // 是否是 esc 按键双击
        if (key?.sequence === esc.repeat(2)) {
          // 倘若允许直接退出
          results.push({ q: currentIssue.text, r: undefined });
          reDraw = false;
          return true;
        }
        break;
      }
      default: {
        dog('\u001b[0m当前触发为含 ctrl 键的功能键', keyValue, key);
        /// 使用 ctrl 键时可能触发输入功能符号，如：`\u0003` 的 `Ctrl + C`
        /// 需要过滤dian
        if (isFalse(key?.ctrl)) {
          otherKey(keyValue);
        } else {
          reDraw = false;
          __p('m');
          if (
            (isTrue(currentIssue.canCtrlCExit) && key?.name === 'c') ||
            (isTrue(currentIssue.canCtrlDExit) && key?.name === 'd')
          ) {
            results.push({ q: currentIssue.text, r: undefined });
            return true;
          }
        }
        break;
      }
    }
    if (reDraw) draw(); // 重绘
    return false;
  };
}
