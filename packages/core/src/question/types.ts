/**
 * 当前问题必须部分
 */
type CurrentIssueRequestParams = {
  /**
   *   当前问题展示
   */
  text: string | number;
};

// 下面的是用户可见（可选参数）及后续代码（解析后必选）可用的
/**
 * 当前问题可选配置项
 *
 *
 */
type CurrentIssueOptionsParams = {
  /**
   *
   *  用户提示：当为纯文本时，展示为文本提示；
   *
   *  当为数组时，默认为选择式提问
   */
  tip: unknown | unknown[];
  /**
   *
   * 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
   */
  type: 'text' | 'password';
  /**
   *
   * 私密模式
   *
   * 缺省值为 `true`
   *
   * 为 `true` 时，将不显示用户输入结果的文本
   */
  private: false | true;
  /**  错误展示文本，缺省时按序查找 `resultText`、`text` 文本 */
  errorText: string;
  /**  结果展示文本，缺省时将展示 `text` 文本  */
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
  /**  是否可以使用 `ctrl + c` 键退出 */
  canCtrlCExit: boolean;
  /**  是否可以使用 `ctrl + d` 键退出 */
  canCtrlDExit: boolean;
  /**  最小长度  */
  minLen: number;
  /**  必须长度  */
  len: number;
  /**  最大长度  */
  maxLen: number;
  /**
   * 选择项的验证单项
   *
   * ```ts
   *  type QuestionVerify = {
   *     // 校验正则
   *     reg: RegExp;
   *     // 不符合时提示文本
   *     info: string;
   *     // 是否为反向验证
   *     inverse?: boolean
   *     // 仅作提示，不在最后进行用户使用 enter 键时强验证
   *     warn?: boolean;
   *  }
   * ```
   */
  verify: QuestionVerify[];
};

/**
 * 选择项的验证单项
 *
 * ```ts
 *  type QuestionVerify = {
 *     // 校验正则
 *     reg: RegExp;
 *     // 不符合时提示文本
 *     info: string;
 *     // 是否为反向验证
 *     inverse?: boolean
 *     // 仅作提示，不在最后进行用户使用 enter 键时强验证
 *     warn?: boolean;
 *  }
 * ```
 */
export type QuestionVerify = {
  /**  正则  */
  reg: RegExp;
  /**  提示的文本  */
  info: string;
  /**  是否为反向验证，默认为 false  */
  inverse?: boolean;
  /**  仅作提示，不在最后进行用户使用 enter 键时强验证  */
  warn?: boolean;
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
 *     //  错误展示
 *     errorText: string;
 *     //  是否为必须的
 *     required?: false | true;
 *     //  非必填时采用默认值
 *     //  缺省时如该项为非必填项则以 `tip` 值为默认值
 *     //  `tip` 值亦为空时默认不允许 `required` 值为 `false`
 *     defaultValue?: string;
 * }
 * ```
 */
export type OriginCurrentIssue = CurrentIssueRequestParams & {
  [x in keyof CurrentIssueOptionsParams]?: CurrentIssueOptionsParams[x];
};

/**  当前的问题（解析后当前问题）  */
export type CurrentIssue = CurrentIssueRequestParams & {
  [x in keyof CurrentIssueOptionsParams]: CurrentIssueOptionsParams[x];
} & {
  // 下面的属性尽在使用时存在，不存在用户使用配置
  /**  展示必须的文本信息  */
  mustInfo: boolean | string;
  /**  本次渲染是否换行  */
  isWrapLine: boolean;
  /**  单行剩余可用  */
  usableLength: number;
  /**  当前光标所在行（相对于渲染问题本身的行数）  */
  row: number;
  /**  渲染次数  */
  cum: number;
  /**  mustInfo 导致光标的偏移量  */
  mustInfoLen: number;
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
  data: QuestionParamData;
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
  init: (param: QuestionParamData) => void;
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
export type QuestionData = {
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
   */
  beforeStart(): void;
};

/**
 * ## 输入参数
 *
 * - `number`
 * - `string`
 * - `OriginCurrentIssue`
 * - `(OriginCurrentIssue | string | number)[]`
 */
export type QuestionParamData =
  | string
  | number
  | OriginCurrentIssue
  | (OriginCurrentIssue | string | number)[];

/**
 *
 *  返回数据类型
 *
 *  当用户正常输入时为正常的返回值（或默认值）
 *
 *  当用户使用强制退出时（双及 `esc` 或其他配置），可退出当前问题，返回值为 undefined
 */
export type QuestionReturn<
  T extends QuestionParamData,
  U extends boolean | undefined,
> = T extends (string | number | OriginCurrentIssue)[]
  ? U extends false | undefined
    ? { q: string | number; r: string | undefined }[]
    : (string | undefined)[]
  : string | undefined;
