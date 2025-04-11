/** 子项的类型   */
export type ManageDataTypeItem = {
  name: string;
  value: (string | boolean)[];
};

/**
 *  子项列的类型
 *
 * 你大概率不太可能会用到这个
 *
 * 这是一个内部使用的类型声明
 *
 * ```ts
 *   type ManageDataTypeItem = {
 *      name: string;
 *      value: (string | boolean)[] | [];
 *   }
 *
 * ```
 *
 */
export type ManageDataTypeObject = {
  name: string;
  value: (string | boolean | number)[];
  options: ManageDataTypeItem[];
};

/**
 *
 *  解析用户参数数据
 *
 * 你大概率不太可能会用到这个
 *
 * 这是一个内部使用的类型声明
 *
 * ```ts
 *    type ManageDataTypeObject = {
 *      name: string;
 *      value: (string | boolean)[] | [];
 *      options: ManageDataTypeItem[] | [];
 *    }
 *   type ManageDataTypeItem = {
 *      name: string;
 *      value: (string | boolean)[] | [];
 *   }
 *
 * ```
 */
export type ManageDataType = {
  /** 结果储存 */
  result: ManageDataTypeObject[];
  /** 临时值，最终将赋值给  `auxiliaryData.values` */
  values: (string | number | boolean)[];
  /** 当前匹配的值 */
  name: string;
  /** 当前匹配值的数据  */
  object: ManageDataTypeObject;
  /** 当前匹配值的子 */
  item: ManageDataTypeItem;
  /** 重置父项 */
  resetObject: (name: string) => void;
  /** 重置子项 */
  resetItem: (name: string) => void;
  /** 初始化数据，防止数据污染 */
  init: () => void;
};
