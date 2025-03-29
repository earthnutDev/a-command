/** current issue
 *  ```js
 *  {
 *    // 当前问题展示
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
 * }
 * ```
 * */
export type CurrentIssueType = {
  /**
   *   当前问题展示
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
   */
  private?: false | true;
  /**
   *
   *  结果展示文本
   */
  resultText?: string;
};

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
  type: 1 | 0;
  /**
   *
   * 多问模式
   */
  multi: boolean;
  /**
   *
   * 用户输入
   */
  userInput: string[];
  /**
   *
   * 多问模式的进度，改变会触发当前问题（`this.currentIssue`）的变更
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
   * 当前问题
   */
  currentIssue: CurrentIssueType;
  /**
   *
   * 结果集，用于多询问模式
   */
  results: unknown[];
  /** 内部方法，混合数据 */
  assign(arg: unknown): void;
  /** 内部方法，变更当前的问题 */
  init(): void;
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
