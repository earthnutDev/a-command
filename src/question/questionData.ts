import { QuestionDataType, QuestionParamDataType } from './types';
import computeCodeCount from './computeCodeCount';
import changeCurrentIssue from './changeCurrentIssue';
import { cursorHide, cursorShow } from 'a-node-tools';

export const originalData: {
  multi: boolean;
  data: QuestionParamDataType;
  type: 0 | 1;
  progressCount: number;
  indexOfCursor: number;
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
    const multi = Array.isArray(param);
    /// 给值
    this.multi = multi;
    // 初始化类型
    data.init();
  },
};

/** data  */
const data: QuestionDataType = {
  /**
   *
   * 当前类型
   *
   * - 0 普通问答
   * - 1 选型问答
   *
   * 该值会在每一次 changeCurrentIssue 时进行赋值
   */
  get type() {
    return originalData.type;
  },
  set type(newValue: 0 | 1) {
    originalData.type = newValue;
    /** 当前类型的改变，触发是否隐藏光标  */
    if (newValue == 1) {
      cursorHide();
    } else {
      cursorShow();
    }
  },

  /**
   *
   * 多问模式
   */
  get multi(): boolean {
    return originalData.multi;
  },
  /**
   *
   * 用户输入
   */
  userInput: [],
  /**
   *
   * 多问模式的进度，改变会触发当前问题的变更
   */
  get progressCount() {
    return originalData.progressCount;
  },
  set progressCount(newValue: number) {
    originalData.progressCount = newValue;
    Reflect.apply(changeCurrentIssue, this, []);
  },
  /**  Buoy movement
   *
   * 浮标移动
   */
  cursorTranslate: 0,
  /**
   *
   * 当前的浮标位置，当改变时会触发 this.cursorTranslate 的自更新
   */
  get indexOfCursor() {
    return originalData.indexOfCursor;
  },

  set indexOfCursor(newValue: number) {
    originalData.indexOfCursor = newValue;
    this.cursorTranslate = Reflect.apply(computeCodeCount, this, []);
  },

  /**
   *
   * 当前问题
   */
  currentIssue: {
    /**
     *
     * 当前问题展示
     **/
    text: 'Please change to your own question',
    /**
     *
     *  用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
     * */
    tip: '',
    /**
     *
     * 类型，仅支持文本（text）和密码（password），缺省为文本
     **/
    type: 'text',
    /**
     *
     *
     * 隐私模式
     */
    private: false,
    /**
     *
     * 结果展示
     */
    resultText: '',
  },
  /**
   *
   * 结果集，用于多询问模式
   */
  results: [],

  /** 混合问题 */
  assign: function (_data: { [key: string]: string }): void {
    Object.keys(_data).forEach((currentKey: string) => {
      // @ts-expect-error  @ts-expect-error   @ts-expect-error
      if (this[currentKey] != undefined) this[currentKey] = _data[currentKey];
    });
  },
  /** 初始化数据，仅在执行前初始化。防止数据残留 */
  init: function (): void {
    /// 清理旧的答案
    this.results.length = 0;
    // 清理旧的输入
    this.userInput = [];
    // 清理旧的光标位置
    this.indexOfCursor = 0;
    /// 该值的变化会初始化当前问题，所以才会有重复赋值 0 的情况
    this.progressCount = originalData.multi
      ? -(originalData.data as []).length
      : 0;
  },
};

export default data;
