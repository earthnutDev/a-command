/**
 *
 * 原始的一个绑定的类型声明
 *
 * 用于 args 及下属属性的类型声明
 *
 */
export type OptionNameArray = {
  [x: string]: string | undefined;
};

/**
 *
 *  处理后的参数的 options 类型声明
 *
 */

export type ArgsItemOptionsType<T = undefined> = T extends undefined
  ? never
  : T extends infer V
    ? V extends string
      ? { name: V; value: string[] }[]
      : never
    : never;

/**
 * 当前的  arg
 *
 * 处理后的原始参数的值
 */
export type ArgsItem<T = OptionNameArray, K extends keyof T = keyof T> = {
  name: K;
  value: string[];
  options: ArgsItemOptionsType<T[K]>;
};

//
/** $map 的类型声明
 *
 * ```ts
 *  type ArgsMapItemType = {
 *      [key:string]: (string | number | boolean)[];
 *      value: (string | number | boolean)[];
 *  }
 * ```
 * */
export type ArgsMapType<T = OptionNameArray> = {
  [Key in keyof T]?: ArgsMapItemType<T[Key]>;
};

type GenerateArrayMapItemKeys<T> = T extends undefined
  ? never
  : T extends infer U
    ? U extends string
      ? U | never
      : never
    : never;

/** $map 值的子项  */
export type ArgsMapItemType<T = undefined> = {
  [K in GenerateArrayMapItemKeys<T> & string]?: (string | number | boolean)[];
} & {
  value?: (string | number | boolean)[];
};

/**
 * 导出数组对象的类型
 *
 * 该类型的返回值仅是原数据的一个变种
 *
 * 将原数据的 name 提出作为数组元素的键名
 *
 * value 作为值下的 value 属性
 *
 * 其他的属性作为值下的其他属性
 *
 * ```ts
 *  type ArgsMapType = {
 *     [key:string]: {
 *          [key:string]: (string | number | boolean)[];
 *          value: (string | number | boolean)[];
 *     }
 *  }
 * ```
 */
export type ArgsArrMapType<T, K extends keyof T = keyof T> = {
  [Key in K]?: ArgsArrMapItemType<T[Key]>;
}[];

/**
 *
 * args 的 arrMap 子数据类型
 *
 */
export type ArgsArrMapItemType<T> = {
  value?: (string | number | boolean)[];
  options?: ArgsArrMapOptions<T>[];
};

/**
 *
 * args 的 arrMap 子元素的 options 类型
 *
 * 接受范型为具体的 options 的键
 *
 * @exports
 *
 * ```ts
 * const a:ArgsArrMapOptions<'--a' | '--b' | '--c'> = {
 *    "--a" : [1,2,3]
 * }
 * ```
 */
export type ArgsArrMapOptions<T> = {
  [key in GenerateArrayMapItemKeys<T> & string]?: (string | number | boolean)[];
};

/**
 * 导出 arg 返回的 args 的类型
 *
 * 是一个继承于 {@link Array} 的对象，有属性
 * - $nomatch  未匹配的值，即顶端的数据
 * - $map      返回的是对象模式，用于配置文件比较好
 * - $arrMap   以 $map 对象作为元素的数组, 适合有顺序的参数调用用
 * - $only     仅包含头部的字符串数组
 * - $original 原始的参数
 * - $isVoid   是否为空
 *
 */
export interface ArgsType<T = OptionNameArray> extends Array<ArgsItem<T>> {
  /**
   *  返回给顶端的数据值
   *
   *   即没有匹配的值
   *
   *   返回该数值是在没有绑定的时候
   *
   *   也能直接拿到数据，且无需去 `process.argv` 抓取
   */
  $nomatch: string[];
  /**
   * 返回 map 模式的数据，用来做配置文件比较爽
   *
   * ```ts
   *  type ArgsMapItemType = {
   *      [key:string]: (string | number | boolean)[];
   *      value: (string | number | boolean)[];
   *  }
   * ````
   */
  $map: ArgsMapType<T>;
  /**
   *  返回的数组数据
   *
   * ```ts
   * type $arrMap = {
   *     [key:string]: {
   *        [key:string]: (string | number | boolean)[];
   *        value: (string | number | boolean)[];
   *    }
   *  }
   * ```
   *
   */
  $arrMap: ArgsArrMapType<T>;
  /**
   *  仅有头部的字符串数组
   *
   *  即，只返回了最开始的匹配模式
   *
   *  暂时并没有发现可用之处
   *
   *  只读可修改数据（修改并影响下一份数据）\
   *  ```ts
   *   type $only = string[]
   *  ```
   */
  $only: (keyof T)[];
  /**
   *  原始参数
   *  用户输入启动参数元数据
   *
   *  相当于 `process.argv.slice(2)`
   *
   *  只读可修改数据（修改并影响下一份数据）
   *
   * ```ts
   *  type  $origin = string[]
   * ```
   */
  $original: string[];
  /**
   *  是否为空
   *
   *  即用户是否根本未使用参数
   *
   *  可做第一判断或是最后全未匹配的验证
   *
   *  ```ts
   *  type  $isVoid = boolean
   *  ```
   */
  $isVoid: boolean;
}
