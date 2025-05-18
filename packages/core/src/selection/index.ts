import { core } from './core';
import {
  SelectionParamDataMapType,
  SelectionParamDataType,
  SelectionResultType,
} from './types';
/**
 *
 * 一个选择器
 *
 * @param data 传入需要由用户选择的数据，可以是数组或对象
 * @param resultType 可选参数
 *
 *
 * ```ts
 *  type SelectionParamDataType = (string | number | {
 *      // 值，若 label 缺省，则使用该值
 *      value: string | number;
 *      // 展示的文本
 *      label?: string | number;
 *      // 是否选中 （仅在 `kind` 值为 `check` 时有效）
 *      checked?: boolean;
 *      // 提示信息 (暂时没想好怎么用)
 *      tip: string
 *
 *  })[];
 *
 *  type DataType = {
 *      data:  any[];  // 选择要渲染的数据
 *      resultText?: string;  // 结果显示
 *      info?:  string;  // 自定义信息
 *      required?: boolean; // 是否为必选项
 *      private?:  false | true; 隐私模式下，用户回答将覆盖上一个问题行
 *      kind?: 'radio' | 'check'; 当前的选择模式
 *  };
 *
 * ```
 *
 * 当数据是由一维纯字符串组成的数组时，默认使用默认配置
 *
 * 例：
 *
 *
 * ```js
 * [
 *    "汉堡",
 *   "牛排",
 *   "披萨",
 * ]
 * ```
 *
 * 当数据为 `Object` 格式时，可以自定义更多信息：
 *
 *例：
 * ```ts
 * {
 *    info: "请选择午餐吃什么",  //自定义提示文字信息
 *    resultText？: "您选择的结果是 ",  // 结果显示
 *    private: true,  // 不显示结果
 *    data: [] //由字符串组成的数组
 * }
 *
 *```
 * @example
 *  导出一个显示的列表选择.
 *
 * 当 data 为一维纯字符串组成的数组时，则默认使用默认的配置.
 *      例:
 *        ```ts
 *          [
 *                 "烧饼",
 *                 "板面",
 *                 "油泼面",
 *           ]
 *          ```
 *
 * 当 data 为 `Object` 格式时，可以自定义更多信息：
 *  @example
 *
 * ```ts
 * {
 *    info       : "请选择中午吃什么",   // 自定义提示文本信息
 *    resultText : "你想吃的是"         // 结果展示
 *    private    : true ,             // 不展示结果
 *    data       :[]                  //  字符串组成的数组
 * }
 *
 * ```
 */
export const selection = async function <
  T extends SelectionParamDataType,
  U extends 'number' | 'string' | undefined = undefined,
>(data: T, resultType?: U): Promise<SelectionResultType<T, U>> {
  return core(data, resultType);
};

export type {
  SelectionParamDataType,
  SelectionParamDataMapType,
  SelectionResultType,
};
