import { core } from './core';
import {
  SelectionCheckDataMap,
  SelectionNoKindDataMap,
  SelectionParamData,
  SelectionParamDataMapType,
  SelectionParamDataType,
  SelectionParamObjectData,
  SelectionRadioDataMap,
  SelectionResultType,
  ValueExtendsType,
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
 *      // 是否不可用，默认值为 false，除非显式的设置为 true
 *      disable: boolean;
 *  })[];
 *
 *  type DataType = {
 *      // 选择要渲染的数据
 *      data:  any[];
 *      // 错误展示文本，缺省时按序查找 `resultText`、`text` 文本
 *      errorText?: string;
 *      // 结果显示
 *      resultText?: string;
 *      // 自定义问题文本
 *      info?:  string;
 *      // 是否为必选项
 *      required?: boolean;
 *      // 隐私模式下，用户回答将覆盖上一个问题行，缺省值为 true，默认不打印结果
 *      private?:  false | true;
 *      // 当前的选择模式 radio 为单选， check 为多选
 *      kind?: 'radio' | 'check';
 *      // 是否可以使用 `ctrl + c` 键退出 ，将返回 undefined
 *      canCtrlCExit: boolean;
 *      //  是否可以使用 `ctrl + d` 键退出
 *      canCtrlDExit: boolean;
 *      //  在允许的情况下最多可渲染的条数 (该值受最终终端的尺寸限制)
 *      maxRows: number;
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
 *
 * 例:
 *
 * ```ts
 *   [
 *          "烧饼",
 *          "板面",
 *          "油泼面",
 *    ]
 * ```
 *
 * 当 data 为 `Object` 格式时，可以自定义更多信息：
 *  @example
 *
 * ```ts
 * {
 *    info       : "请选择中午吃什么",   // 自定义提示文本信息
 *    resultText : "你想吃的是"         // 结果展示
 *    private    : true ,             // 不展示结果
 *    data       :[]                  //  字符串组成的数组或是详细的配置项
 * }
 *
 * ```
 */
export async function selection<T extends ValueExtendsType = string>(
  data: SelectionCheckDataMap<T>,
  resultType?: 'string',
): Promise<SelectionResultType<T, SelectionCheckDataMap<T>, 'string'>>;
export async function selection<T extends ValueExtendsType = number>(
  data: SelectionCheckDataMap<T>,
  resultType?: 'number',
): Promise<SelectionResultType<T, SelectionCheckDataMap<T>, 'number'>>;
export async function selection<T extends ValueExtendsType = string>(
  data: SelectionRadioDataMap<T>,
  resultType?: 'string',
): Promise<SelectionResultType<T, SelectionRadioDataMap<T>, 'string'>>;
export async function selection<T extends ValueExtendsType = number>(
  data: SelectionRadioDataMap<T>,
  resultType?: 'number',
): Promise<SelectionResultType<T, SelectionRadioDataMap<T>, 'number'>>;
export async function selection<T extends ValueExtendsType = string>(
  data: SelectionNoKindDataMap<T>,
  resultType?: 'string',
): Promise<SelectionResultType<T, SelectionNoKindDataMap<T>, 'string'>>;
export async function selection<T extends ValueExtendsType = number>(
  data: SelectionNoKindDataMap<T>,
  resultType?: 'number',
): Promise<SelectionResultType<T, SelectionNoKindDataMap<T>, 'number'>>;
export async function selection<T extends ValueExtendsType>(
  data: SelectionParamData<T>,
  resultType?: 'string',
): Promise<SelectionResultType<T, SelectionRadioDataMap<T>, 'string'>>;
export async function selection<T extends ValueExtendsType>(
  data: SelectionParamData<T>,
  resultType?: 'number',
): Promise<SelectionResultType<T, SelectionRadioDataMap<T>, 'number'>>;

/**    */
export function selection<T extends ValueExtendsType = string>(
  data: SelectionParamDataType<T>,
  resultType?: 'string' | 'number',
): Promise<SelectionResultType<T, typeof data, typeof resultType>> {
  return core<T, typeof data, typeof resultType>(
    data,
    resultType,
  ) as unknown as Promise<
    SelectionResultType<T, typeof data, typeof resultType>
  >;
}

export type {
  SelectionParamDataType,
  SelectionParamDataMapType,
  SelectionResultType,
  SelectionParamObjectData,
  ValueExtendsType,
  SelectionCheckDataMap,
  SelectionRadioDataMap,
  SelectionParamData,
  SelectionNoKindDataMap,
};
