/**
 * @file  index.ts
 * @description 解析用户在终端启动时的使用参数
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  Args
 * @since 2026-01-08 11:12:09
 * @lastModified 2026-01-08 12:25
 **/

import {
  ArgsArrMap,
  ArgsArrMapItem,
  ArgsGeneralItemParadigm,
  ArgsItemOptions,
  ArgsMap,
  ArgsMapItem,
  ArgsArrMapOptions,
  ArgsType,
} from './types';

export { Args } from './args';

export type {
  ArgsGeneralItemParadigm,
  ArgsItemOptions,
  ArgsMap,
  ArgsMapItem,
  ArgsArrMap,
  ArgsArrMapItem,
  ArgsArrMapOptions,
  ArgsType,
};

/**
 * ## 原始的一个绑定的类型声明，用于 `args` 以及子属性的类型声明
 *
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsGeneralItemParadigm` 替代
 */
export type OptionNameArray = ArgsGeneralItemParadigm;

/**
 * ## 处理后的参数的 options 类型声明
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsItemOptions` 替代
 */
export type ArgsItemOptionsType = ArgsItemOptions;

/**
 * ## `Args` 实例属性 `$map` ，使用对象的形式描述用户使用参数
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsMap` 替代
 */
export type ArgsMapType = ArgsMap;

/**
 * ## $map 属性值
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsMapItem` 替代
 */
export type ArgsMapItemType = ArgsMapItem;
/**
 * ##  `Args` 实例 `$arrMap` 属性
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsArrMap` 替代
 */
export type ArgsArrMapType<T, K extends keyof T = keyof T> = ArgsArrMap<T, K>;

/**
 * ## `Args` 实例的 `arrMap` 子项
 * @deprecated 该类型声明可能将在下一个版本移除，请使用 `ArgsArrMapItem` 替代
 */
export type ArgsArrMapItemType<T> = ArgsArrMapItem<T>;
