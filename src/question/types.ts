/**
 *
 * 当前的 🙋
 *
 *
 *  ```ts
 *  {
 *    // 当前 🙋 展示
 *    text: string,
 *    // 用户提示：当为纯文本时，展示为文本提示；
 *    //  当为数组时，默认为选择式提问
 *     tip?: string | number | never | Boolean | null | undefined | any[],
 *     // 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
 *     type?: "text" | "password",
 *     //  私密模式
 *     private?: false | true,
 *     //   结果展示文本
 *     resultText?: string
 *     //  是否为必须的
 *     required?: false | true;
 *     //  非必填时采用默认值
 *     //  缺省时如该项为非必填项则以 `tip` 值为默认值
 *     //  `tip` 值亦为空时默认不允许 `required` 值为 `false`
 *     defaultValue?: string;
 * }
 * ```
 * */
export type CurrentIssueType = {
  /**
   *   当前 🙋 展示
   **/
  text: string;
  /**
   *
   *  用户提示：当为纯文本时，展示为文本提示；
   *
   *  当为数组时，默认为选择式提问
   * */
  tip?: unknown | unknown[];
  /**
   *
   * 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
   **/
  type?: 'text' | 'password';
  /**
   *
   * 私密模式
   *
   * 缺省值为 `false`
   *
   * 为 `true` 时，将不显示用户输入结果的文本
   */
  private?: false | true;
  /**
   *
   *  结果展示文本
   *
   *
   */
  resultText?: string;
  /**
   *
   * 是否为必须的
   *
   * 缺省值为 `true`
   *
   * *对于选择式提问不适用*
   *
   */
  required?: false | true;
  /**
   *
   *  非必填时采用默认值
   *
   *  缺省时如该项为非必填项则以 `tip` 值为默认值
   *
   *  `tip` 值亦为空时默认不允许 `required` 值为 `false`
   *
   */
  defaultValue?: string;
};

/**
 *
 * 原始数据
 *
 */

export interface OriginalData {
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
  kind: 0 | 1;
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
}

/**
 *
 *  数据类型
 */
export type QuestionDataType = {
  /**
   *
   * 当前类型
   *
   * - 0 普通问答
   * - 1 选型问答
   */
  kind: 1 | 0;
  /**
   *
   * 多问模式
   */
  multi: boolean;
  /**
   *
   * 用户输入文本
   *
   *
   */
  enterText: string[];
  /**
   *
   * 多问模式的进度，改变会触发当前 🙋 （`this.currentIssue`）的变更
   */
  progressCount: number;
  /**
   *
   * 浮标移动
   */
  cursorTranslate: number;
  /**
   * 当前的浮标位置，当改变时会触发 `this.cursorTranslate` 的自更新
   */
  indexOfCursor: number;
  /**
   *
   * 当前 🙋
   */
  currentIssue: CurrentIssueType;
  /**
   *
   * 结果集，用于多询问模式
   */
  results: { r: string; q: string }[];
  /** 内部方法，混合数据 */
  assign(arg: QuestionDataType): void;
  /**
   *  内部方法，仅在该问询的开始时调用一次，初始化当前 🙋 的数量
   *
   *  而初始化当前 🙋 的数量时，将执行当前的 🙋 的更新及下一轮 🙋 的🎨开始
   * */
  beforeStart(): void;
};

/**
 *
 * 参数类型
 *
 *
 */
export type QuestionParamDataType =
  | string
  | string[]
  | CurrentIssueType
  | CurrentIssueType[]
  | (CurrentIssueType | string)[];
