import { _p } from 'a-node-tools';
import {
  isArray,
  isBusinessEmptyString,
  isEmptyString,
  isNumber,
  isString,
  isUndefined,
} from 'a-type-of-js';
import { originalData } from './originalData';
import {
  CurrentIssue,
  OriginCurrentIssue,
  QuestionAssign,
  QuestionData,
} from './types';

/**
 *
 *问题数据
 *
 */
export const dataStore: QuestionData = {
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

  /**
   * 混合问题（将在 `changeCurrentIssue` 时触发，数据已解析 ）
   * @param _data
   */
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

/** 变更当前问题（每次变更会初始化 ） */
function changeCurrentIssue(this: QuestionData) {
  const { multi, progressCount } = this;
  const text = '请使用你自己的问题';
  // 原始问题
  // 当为单问模式直接读取当前问题
  // 如果是多问模式根据当前的 `progressCount` 读取当前的问题
  const _d: number | string | OriginCurrentIssue =
    multi && isArray(originalData.data)
      ? originalData.data[originalData.data.length + progressCount]
      : (originalData.data as never);
  /**  初始化一个空白问题  */
  const currentIssue = createCurrentIssue();
  /**
   *
   * 混合问题
   *
   * - 如果是 `string` 类型，则直接赋值给 `text`
   * - 如果是 `object` 类型，则混合数据
   */
  Object.assign(currentIssue, isString(_d) || isNumber(_d) ? { text: _d } : _d);

  // 初始化当前问题
  const kind: 0 | 1 = isArray(currentIssue.tip) ? 1 : 0;

  let enterText: string[];

  // kind 为 1 简易选择模式时直接给输入框赋值
  if (kind == 1) {
    enterText = [(currentIssue.tip as string[])[0]];
  } else {
    enterText = [];

    /**  即没有提示有没有 `defaultValue` 值时，不允许显式设置 `required` 为 `false`  */
    if (
      [currentIssue.tip, currentIssue.defaultValue].every(e => isEmptyString(e))
    ) {
      currentIssue.required = true;
    }

    /**  当 `defaultValue` 值不为空时而 `tip` 值为空时，则将 `tip` 值设置为 `defaultValue`   */
    if (
      !isBusinessEmptyString(currentIssue.defaultValue) &&
      isEmptyString(currentIssue.tip)
    ) {
      currentIssue.tip = currentIssue.defaultValue;
    }
  }

  currentIssue.text = isBusinessEmptyString(currentIssue.text.toString())
    ? text
    : currentIssue.text;
  /**  初始化用户的输入  */

  this.assign({
    indexOfCursor: 0,
    kind,
    enterText,
    currentIssue,
  });
}
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
