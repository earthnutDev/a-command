/**
 *
 * 绑定命令行参数类型说明
 *
 * ##  字符串
 *
 * ```bash
 *  commandName <-n> (命令描述)
 * ```
 *
 * - 其中 `commandName` 为命令名称
 * - `<-n>` 为缩写
 * - `(命令描述)` 为命令描述
 *
 * ## 对象
 *
 * ### 标准对象模式
 *
 * ```ts
 * {
 *   name: 'commandName',
 *   abbr: '-n',
 *   info: '命令描述',
 *   options: [{
 *     name: 'optionName',
 *     abbr: '-o',
 *     info: '选项描述'
 *   }]
 * }
 * ```
 *
 * - 其中 `name` 为命令名称
 * - `abbr` 为缩写
 * - `info` 为命令描述
 *
 * ### 子项对象模式
 *
 * ```ts
 * {
 *    "init <-i> (初始化)" : [
 *
 *
 *     ]
 *
 * }
 * ```
 *
 *
 * ##  数组
 *  - 数组的格式为 `['commandName -n (命令描述)', { name: 'commandName', abbr: '-n', info: '命令描述'  }, ]`
 * */
export type BindParamsType =
  | string
  | {
      [key in string]?: BindParamsOptionsType;
    }
  | (string | ParamType)[]
  | ParamType;

/**
 *
 *  绑定的子项类型声明
 *
 * 这个一般用不到
 * ```ts
 * // 命令行选项参数
 * type  SubOptionsType =  {
 *     name?: string ;
 *     info?: string ;
 *     abbr?: string ;
 *     hide?: boolean;
 *   }
 * ```
 */
export type BindParamsOptionsType =
  | string
  | SubOptionsType
  | (string | SubOptionsType)[];

/**  结束代码  */
export type OverCode = 'version' | 'help' | 'error' | 'end';

/**   当前的状态 */
export type StateType = {
  code: 1 | 2 | 3 | 4;
  text: 'start' | 'bind over' | 'run over' | 'over';
  overCode?: OverCode;
};

/**
 *
 * 参数类型
 */
export type ParamType = {
  /**
   *
   * 命令行选项名称
   */
  name: string;
  /**
   *
   * 功能描述
   */
  info: string;
  /**   选项 */
  options?: BindParamsOptionsType;
  /**  缩写 */
  abbr?: string;
  /**  是否展示在帮助中 */
  hide?: boolean;
};

/** Command line option parameter
 *
 *
 * 命令行选项参数
 *
 * ```ts
 *  {
 *    name?: string ;
 *    info?: string ;
 *    abbr?: string ;
 *    hide?: boolean;
 *  }
 * ```
 *
 * 参数类型为用户输入，不强制用户输入包含所有的参数\
 * 这一点与下面的  `BindParamsType` 及  `BindParamsOptionsType` 不同
 *
 */

export type SubOptionsType = {
  /**
   *
   * 命令行选项参数名称，建议在 15 个英文字符内
   */
  name: string;
  /**
   *
   * 功能描述
   */
  info: string;
  /**
   *
   * 缩写，名字都限制 15 了，这个限制 10 没问题吧
   */
  abbr?: string;
  /**
   *
   * 是否展示在帮助中
   */
  hide?: boolean;
};

/**
 *  原始绑定的类型声明
 *
 *  ```ts
 *  type  SubOptionsType = {
 *        name: string;
 *        abbr: string;
 *        info: string;
 *        hide: boolean;
 *   }
 *
 * ```
 */
export type ArgOriginBind = {
  [key: string]: {
    name: string;
    info: string;
    abbr: string;
    options: { [key: string]: SubOptionsType };
  };
};
