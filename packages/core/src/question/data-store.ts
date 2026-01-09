import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { changeCurrentIssue } from './changeCurrentIssue';
import { originalData } from './originalData';
import { CurrentIssue, QuestionAssign, QuestionDataType } from './types';

/**  创建一个新的问题  */
export function createCurrentIssue(): CurrentIssue {
  return {
    text: '请更换为你自己的问题',
    tip: '',
    type: 'text',
    private: true,
    errorText: '',
    resultText: '',
    required: true,
    defaultValue: '',
    mustInfo: false,
    canCtrlCExit: false,
    canCtrlDExit: false,
    isWrapLine: false,
    usableLength: 0,
    mustInfoLen: 0,
    row: 0,
    cum: 0,
    maxLen: 0,
    minLen: 0,
    len: 0,
    verify: [],
  };
}

/**
 *
 *问题数据
 *
 */
export const dataStore: QuestionDataType = {
  get kind() {
    return originalData.kind;
  },
  set kind(newValue: 0 | 1) {
    /**  配置默认值  */
    if (!isFinite(newValue) || (newValue != 0 && newValue != 1)) newValue = 0;

    originalData.kind = newValue;
    // 在每次绘制前会单独触发光标隐藏
    /** 当前类型的改变，触发是否隐藏光标  */
    // if (newValue == 1) cursorHide();
    // else cursorShow();
  },

  get multi(): boolean {
    return originalData.multi;
  },

  enterText: [],

  get progressCount() {
    return originalData.progressCount;
  },
  /// 通常 newValue 为小于 1 的整数
  set progressCount(newValue: number) {
    originalData.progressCount = newValue;
    // 问题更新
    // 之前未做校验，导致该值在超出边界后触发，导致 `kind` 值的更新而触发光标异常隐藏
    if (newValue < 0) Reflect.apply(changeCurrentIssue, this, []);
  },

  get indexOfCursor() {
    return originalData.indexOfCursor;
  },

  set indexOfCursor(newValue: number) {
    originalData.indexOfCursor = newValue;
  },
  /// 初始化的问题
  currentIssue: createCurrentIssue(),

  results: [],

  /** 混合问题（将在 `changeCurrentIssue` 时触发，数据已解析 ）  */
  assign(_data): void {
    /**  该过程将初始化数据  */
    (Object.keys(_data) as (keyof QuestionAssign)[]).forEach(currentKey => {
      if (Object.hasOwn(this, currentKey) && !isUndefined(_data[currentKey])) {
        // @ts-expect-error @ts-expect-error  @ts-expect-error (懒人赋值法)
        this[currentKey] = _data[currentKey];
      } else {
        _p(`${currentKey} is not exist`);
        throw new Error(`${currentKey} is not exist`);
      }
    });
  },
  /** 初始化数据，仅在执行前初始化。防止数据残留 */
  beforeStart(): void {
    /// 清理旧的答案
    this.results.length =
      // 清理旧的输入
      this.enterText.length =
      // 清理旧的光标位置
      this.indexOfCursor =
        0;
    /// 该值的变化会初始化当前问题，所以才会有重复赋值 0 的情况
    this.progressCount = originalData.multi
      ? -(originalData.data as []).length
      : -1;
  },
};
