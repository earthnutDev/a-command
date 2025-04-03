import { QuestionDataType } from './types';
import computeCodeCount from './computeCodeCount';
import changeCurrentIssue from './changeCurrentIssue';
import { cursorHide, cursorShow } from 'a-node-tools';
import { originalData } from './originalData';

/**
 *
 * 🙋 数据
 *
 */
export const questionData: QuestionDataType = {
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
    /**  配置默认值  */
    if (!isFinite(newValue) || (newValue != 0 && newValue != 1)) {
      newValue = 0;
    }
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
   *
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
   * 多问模式的进度，改变会触发当前 🙋 的变更
   *
   */
  get progressCount() {
    return originalData.progressCount;
  },
  set progressCount(newValue: number) {
    originalData.progressCount = newValue;
    Reflect.apply(changeCurrentIssue, this, []);
  },
  /**
   *
   * 浮标移动
   *
   *
   */
  cursorTranslate: 0,
  /**
   *
   * 当前的浮标位置，当改变时会触发 this.cursorTranslate 的自更新
   *
   *
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
   * 当前 🙋
   *
   *
   */
  currentIssue: {
    /**
     *
     * 当前 🙋 展示
     *
     *
     **/
    text: 'Please change to your own question',
    /**
     *
     *  用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
     *
     *
     * */
    tip: '',
    /**
     *
     * 类型，仅支持文本（text）和密码（password），缺省为文本
     *
     *
     **/
    type: 'text',
    /**
     *
     *
     * 隐私模式
     *
     */
    private: false,
    /**
     *
     * 结果展示
     *
     */
    resultText: '',
    /**
     *
     * 是否为必须的
     *
     * 缺省值为 `true`
     *
     * *对于选择式提问不适用*
     *
     */
    required: true,
    /**
     *
     *  非必填时采用默认值
     *
     *  缺省时如该项为非必填项则以 tip 值为默认值
     *
     *  tip 值亦为空时默认不允许 required 值为 false
     *
     */
    defaultValue: '',
  },
  /**
   *
   * 结果集，用于多询问模式
   */
  results: [],

  /** 混合 🙋 */
  assign: function (_data: { [key: string]: string }): void {
    /**  该过程将初始化数据  */
    Object.keys(_data).forEach((currentKey: string) => {
      // @ts-expect-error  @ts-expect-error   @ts-expect-error
      if (this[currentKey] != undefined) this[currentKey] = _data[currentKey];
    });
  },
  /** 初始化数据，仅在执行前初始化。防止数据残留 */
  beforeStart: function (): void {
    /// 清理旧的答案
    this.results.length = 0;
    // 清理旧的输入
    this.userInput = [];
    // 清理旧的光标位置
    this.indexOfCursor = 0;
    /// 该值的变化会初始化当前 🙋 ，所以才会有重复赋值 0 的情况
    this.progressCount = originalData.multi
      ? -(originalData.data as []).length
      : 0;
  },
};
