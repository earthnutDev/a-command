import { esc } from '@color-pen/static';
import { __p, _p, readInput, ReadInputKey } from 'a-node-tools';
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
import { dog } from '../utils/dog';
import { dataStore } from './data-store';
import { draw } from './draw';
import { QuestionData } from './types';

/**
 *
 * 监听用户键盘输入并处理
 *
 */
export async function userInput(this: QuestionData) {
  /**  等待用户输入  */
  try {
    await readInput(userInputCn(this));
  } catch (error) {
    dog.error('接收用户输入出错', error);
    _p(error);
  }
}

/**
 *
 * @param _this
 */
export function userInputCn(_this: QuestionData) {
  return (keyValue: string | undefined, key: ReadInputKey) => {
    const { kind, currentIssue, enterText, results } = _this;

    const { tip, text, canCtrlCExit, canCtrlDExit } = currentIssue;
    /**  当为选择模式时的可选项数组  */
    let arr: string[] = [],
      /**  选择模式下可选择项数  */
      len: number = 0,
      /**  可选项模式当前下标  */
      _index: number = 0,
      reDraw = true;
    /**  当前为选择模式而不是输入模式  */
    if (!isZero(kind)) {
      // 选择模式
      arr = tip as string[];
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
          results.push({ q: text, r: undefined });
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
            (isTrue(canCtrlCExit) && key?.name === 'c') ||
            (isTrue(canCtrlDExit) && key?.name === 'd')
          ) {
            results.push({ q: text, r: undefined });
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

/**
 *
 * 键盘中右键触发
 *
 * @param arr
 * @param _index
 * @param len
 */
function fightKey(arr: string[], _index: number, len: number) {
  const { kind, enterText } = dataStore;
  if (isZero(kind)) {
    dataStore.indexOfCursor =
      dataStore.indexOfCursor == dataStore.enterText.length
        ? 0
        : dataStore.indexOfCursor + 1;
  } else {
    enterText[0] = arr[_index == len ? 0 : _index + 1];
  }
}

/**
 *
 * 左键
 *
 * @param arr 在选择模式下的数组
 * @param _index 上一次选中的位置下表
 * @param len 选择模式的总长度
 */
function leftKey(arr: string[], _index: number, len: number) {
  const { kind, enterText } = dataStore;
  // 普通输入模式
  if (isZero(kind)) {
    dataStore.indexOfCursor =
      dataStore.indexOfCursor === 0
        ? enterText.length
        : dataStore.indexOfCursor - 1;
  } else {
    // 选择模式切换当前的输入值
    enterText[0] = arr[_index === 0 ? len : _index - 1];
  }
}

/**
 * ## 回车键
 * 返回值将作为当前 `userInput` 输入结束的判定依据
 */
function returnKey() {
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

/**
 * ## 其他键
 * @param keyValue 键值
 */
function otherKey(keyValue: string | undefined) {
  const { enterText, kind } = dataStore;

  // 在当前模式为用户输入模式时
  if (!isUndefined(keyValue) && kind === 0) {
    if (dataStore.indexOfCursor == enterText.length) {
      enterText.push(keyValue);
    } else {
      enterText.splice(dataStore.indexOfCursor, 0, keyValue);
    }
    dataStore.indexOfCursor += 1;
  }
}

/** 删除键或回退键 */
function delKey() {
  const { enterText, kind } = dataStore;
  if (isZero(kind) && !isZero(dataStore.indexOfCursor)) {
    enterText.splice(dataStore.indexOfCursor - 1, 1);
    dataStore.indexOfCursor--;
  }
}
