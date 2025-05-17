import { QuestionAssign, QuestionDataType } from './types';
import { computeCodeCount } from './computeCodeCount';
import changeCurrentIssue from './changeCurrentIssue';
import { _p, cursorHide, cursorShow } from 'a-node-tools';
import { originalData } from './originalData';

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
    if (!isFinite(newValue) || (newValue != 0 && newValue != 1)) {
      newValue = 0;
    }
    originalData.kind = newValue;
    /** 当前类型的改变，触发是否隐藏光标  */
    if (newValue == 1) {
      cursorHide();
    } else {
      cursorShow();
    }
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
    Reflect.apply(changeCurrentIssue, this, []);
  },

  cursorTranslate: 0,

  get indexOfCursor() {
    return originalData.indexOfCursor;
  },

  set indexOfCursor(newValue: number) {
    originalData.indexOfCursor = newValue;
    this.cursorTranslate = Reflect.apply(computeCodeCount, this, []);
  },
  /// 初始化的问题
  currentIssue: {
    text: 'Please change to your own question',
    tip: '',
    type: 'text',
    private: false,
    resultText: '',
    required: true,
    defaultValue: '',
    mustInfo: false,
  },

  results: [],

  /** 混合问题*/
  assign(_data): void {
    /**  该过程将初始化数据  */
    Object.keys(_data).forEach(currentKey => {
      if (
        Object.hasOwn(this, currentKey) &&
        _data[currentKey as keyof QuestionAssign] != undefined
      ) {
        // @ts-expect-error  @ts-expect-error   @ts-expect-error
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
    this.results.length = 0;
    // 清理旧的输入
    this.enterText = [];
    // 清理旧的光标位置
    this.indexOfCursor = 0;
    /// 该值的变化会初始化当前问题，所以才会有重复赋值 0 的情况
    this.progressCount = originalData.multi
      ? -(originalData.data as []).length
      : 0;
  },
};
