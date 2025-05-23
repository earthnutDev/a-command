export type CurrentIssueRequestParams = {
  /**
   *   当前问题展示
   **/
  text: string | number;
};

/**
 * 当前问题可选配置项
 *
 *
 */
export type CurrentIssueOptionsParams = {
  /**
   *
   *  用户提示：当为纯文本时，展示为文本提示；
   *
   *  当为数组时，默认为选择式提问
   * */
  tip: unknown | unknown[];
  /**
   *
   * 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
   **/
  type: 'text' | 'password';
  /**
   *
   * 私密模式
   *
   * 缺省值为 `false`
   *
   * 为 `true` 时，将不显示用户输入结果的文本
   */
  private: false | true;
  /**
   *
   *  结果展示文本
   *
   *
   */
  resultText: string;
  /**
   *
   * 是否为必须的
   *
   * 缺省值为 `true`
   *
   * *对于选择式提问不适用*
   *
   */
  required: false | true;
  /**
   *
   *  非必填时采用默认值
   *
   *  缺省时如该项为非必填项则以 `tip` 值为默认值
   *
   *  `tip` 值亦为空时默认不允许 `required` 值为 `false`
   *
   */
  defaultValue: string;
  /**  似乎否可以使用 `ctrl + c` 键退出 */
  canCtrlCExit: boolean;
  /**  似乎否可以使用 `ctrl + d` 键退出 */
  canCtrlDExit: boolean;
};
/**
 *
 * 当前的问题
 *
 *
 *  ```ts
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
 *     //  是否为必须的
 *     required?: false | true;
 *     //  非必填时采用默认值
 *     //  缺省时如该项为非必填项则以 `tip` 值为默认值
 *     //  `tip` 值亦为空时默认不允许 `required` 值为 `false`
 *     defaultValue?: string;
 * }
 * ```
 * */
export type CurrentIssueType = CurrentIssueRequestParams & {
  [x in keyof CurrentIssueOptionsParams]?: CurrentIssueOptionsParams[x];
};

/**  当前的问题（实际使用）  */
export type CurrentIssue = CurrentIssueRequestParams & {
  [x in keyof CurrentIssueOptionsParams]: CurrentIssueOptionsParams[x];
} & {
  // 下面的属性尽在使用时存在，不存在用户使用配置
  /**  展示必须的文本信息  */
  mustInfo: boolean;
  /**  本次渲染是否换行  */
  isWrapLine: boolean;
  /**  单行剩余可用  */
  usableLength: number;
  /**  当前光标所在行（相对于渲染问题本身的行数）  */
  row: number;
  /**  渲染次数  */
  cum: number;
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
   * 原始的问题
   *
   */
  data: QuestionParamDataType;
  /**
   *
   * 当前问题的类型
   *
   * - 0 普通问答
   * - 1 选型问答
   */
  kind: 0 | 1;
  /**
   *
   * 多问模式的进度，改变会触发当前问题的变更
   *
   * 该值为小于 1 的整数
   */
  progressCount: number;
  /** 当前的浮标位置（正常位置为输入的末尾，有值也是相对于末尾来说的）*/
  indexOfCursor: number;
  /**
   * 数据初始化方法
   */
  init: (param: QuestionParamDataType) => void;
}

/**
 * 混合数据时的类型，该类型必须严谨
 */
export type QuestionAssign = {
  indexOfCursor: number;
  kind: 0 | 1;
  enterText: string[];
  currentIssue: CurrentIssue;
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
   *
   * 该值会在每一次 changeCurrentIssue 时进行赋值
   */
  kind: 1 | 0;
  /**  多问模式 */
  multi: boolean;
  /** 用户输入文本 */
  enterText: string[];
  /**  多问模式的进度，改变会触发当前问题（`this.currentIssue`）的变更 */
  progressCount: number;
  /**  当前的浮标位置   */
  indexOfCursor: number;
  /**  当前问题 */
  currentIssue: CurrentIssue;
  /** 结果集，用于多询问模式 */
  results: { r: string | undefined; q: string | number }[];
  /** 内部方法，混合数据 */
  assign(arg: QuestionAssign): void;
  /**
   *  内部方法，仅在该问询的开始时调用一次，初始化当前问题的数量
   *
   *  而初始化当前问题的数量时，将执行当前的问题的更新及下一轮问题的🎨开始
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
  | number
  | CurrentIssueType
  | (CurrentIssueType | string | number)[];

/**
 *
 *  返回数据类型
 *
 *  当用户正常输入时为正常的返回值（或默认值）
 *
 *  当用户使用强制退出时（双及 `esc` 或其他配置），可退出当前问题，返回值为 undefined
 */
export type QuestionReturnType<
  T extends QuestionParamDataType,
  U extends boolean | undefined,
> = T extends (string | number | CurrentIssueType)[]
  ? U extends false | undefined
    ? { q: string | number; r: string | undefined }[]
    : (string | undefined)[]
  : string | undefined;
