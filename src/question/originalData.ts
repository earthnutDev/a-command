import { isArray } from 'a-type-of-js';
import { QuestionParamDataType } from './types';

export const originalData: {
  /**
   *
   * 是否为多问模式（很鸡肋的用法）
   *
   */
  multi: boolean;
  /**
   *
   * 原始的 🙋
   *
   */
  data: QuestionParamDataType;
  /**
   *
   * 当前 🙋 的类型
   *
   * - 0 普通问答
   * - 1 选型问答
   */
  type: 0 | 1;
  /**
   *
   * 多问模式的进度，改变会触发当前 🙋 的变更
   *
   */
  progressCount: number;
  /**
   *
   * 当前的浮标位置，当改变时会触发 this.cursorTranslate 的自更新
   */
  indexOfCursor: number;
  /**
   * 数据初始化方法
   */
  init: (param: QuestionParamDataType) => void;
} = {
  /** 该值在下面的 init 中初始化 */
  data: '',
  /** 该值在每一次 `changeCurrentIssue` 时自动更新 */
  type: 0,
  /** 该值在下面的 init 中初始化 */
  multi: false,
  /** 该值在下面的 init 中初始化 */
  progressCount: 0,
  /** 该值在每一次绘制前根据与用户交互的结果进行给值 */
  indexOfCursor: 0,
  /** 初始化数据 */
  init: function (param: QuestionParamDataType) {
    // 初始化数据
    this.data = param;
    // 参看是单问模式还是多问模式
    this.multi = isArray(param);
  },
};
