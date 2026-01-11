/**
 * @file info.ts
 * @description 构建输入
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  info
 * @since 2026-01-09 09:43
 * @lastModified 2026-01-11 16:28
 */

import { _p } from 'a-node-tools';
import {
  brightCyanPen,
  brightGreenPen,
  brightMagentaPen,
  brightRedPen,
  brightYellowPen,
  hexPen,
} from 'color-pen';
import { pen666 } from './utils/pen';

export interface PrintOption {
  /**  颜色  */
  color: string;
  /**   前缀  */
  prefix: string;
}

/**  打印消息使用参数  */
export type CommandPrintOption = {
  [x in keyof PrintOption]?: PrintOption[x];
};

export const prefixList = {
  /**
   * ## 提示
   *
   * 默认为绿色的 <span style="color:#2ceeec;">✦</span>
   * @param prefix 显示前置标志
   */
  info: (prefix: string = '✦') => brightCyanPen(prefix),
  /**
   * ## 完成
   *
   * 默认为绿色的 <span style="color:#2fe81a;">❖</span>
   * @param prefix 显示前置标志
   */
  success: (prefix: string = '❖') => brightGreenPen(prefix),
  /**
   * ## 当前项
   *
   * 默认为黄色的 <span style="color:#e8ec14;">▶︎</span>
   * @param prefix 显示前置标志
   */
  current: (prefix: string = '▶︎') => brightYellowPen(prefix),
  /**
   * ## 警示
   *
   * 默认为洋红色的 <span style="color:#fb00fa;">◼︎</span>
   * @param prefix 显示前置标志
   */
  warn: (prefix: string = '◼︎') => brightMagentaPen(prefix),
  /**
   *  ## 错误
   *
   * 默认为红色的 <span style="color:#fc2119;">⚉</span>
   * @param prefix 显示前置标志
   */
  error: (prefix: string = '⚉') => brightRedPen(prefix),
  /**
   *
   * ## 单选的未选中
   *
   * 默认为暗黑色（#666）的 <span style="color:#666;">◦</span>
   * @param prefix 显示前置标志
   */
  radioNoSelect: (prefix: string = '◦') => pen666(prefix),
  /**
   *
   * ## 单选的选中
   *
   * 默认为绿色（#2fe81a）的 <span style="color:#2fe81a;">⚉</span>
   * @param prefix 显示前置标志
   */
  radioSelect: (prefix: string = '●') => brightGreenPen.blink(prefix),
  /**
   *
   * ## 多选未选择未聚焦
   *
   * 默认为暗黑色（#666）的 <span style="color:#666;">□</span>
   *
   * @param prefix 显示前置标志
   */
  multipleChoice: (prefix: string = '□') => pen666(prefix),
  /**
   *
   * ## 多选聚焦未选择
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">□</span>
   * @param prefix 显示前置标志
   *
   */
  multipleChoiceFocus: (prefix: string = '□') => brightGreenPen.blink(prefix),
  /**
   *
   * ## 多选选择未聚焦
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">■</span>
   *
   * @param prefix 显示前置标志
   */
  multipleChoiceChecked: (prefix: string = '■') => pen666(prefix),
  /**
   *
   * ## 多选选择聚焦
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">■</span>
   *
   * @param prefix 显示前置标志
   */
  multipleChoiceCheckedFocus: (prefix: string = '■') =>
    brightGreenPen.blink(prefix),
} as const;

/**
 *  警示
 *
 * 默认为洋红色的 <span style="color:#fb00fa;">◼︎</span>
 *
 * @param message  将打印的消息
 * @param prefix 前置标记
 * @returns void
 */
export function WARN(message: string, prefix?: string) {
  _p(`${prefixList.warn(prefix)} ${message}`);
}

/**
 * 当前项
 *
 * 默认为黄色的 <span style="color:#e8ec14;">▶︎</span>
 *
 * @param message 将打印文本消息
 * @param prefix  前置标志符
 */
export function CURRENT(message: string, prefix?: string) {
  _p(`${prefixList.current(prefix)} ${message}`);
}

/**
 *  提示信息
 *
 *  * 默认为绿色的 <span style="color:#2ceeec;">✦</span>
 * @param message 将打印的信息文本
 * @param prefix 前置
 */
export function INFO(message: string, prefix?: string) {
  _p(`${prefixList.info(prefix)} ${message}`);
}

/**
 * 错误信息展示
 * @param message 展示的文本
 * @param [prefix='⚉'] 展示的前缀，默认为红色的 <span style="color:#fc2119;">⚉</span>
 * @returns void
 */
export function ERROR(
  message: string | number | null | undefined | boolean,
  prefix: string = '⚉',
) {
  _p(`${prefixList.error(prefix)} ${hexPen('#612').italic(message)}`);
}

/**
 * 成功信息展示
 * @param message 展示的文本
 * @param [prefix='⚉'] 展示的前缀，默认为绿色的 <span style="color:#2fe81a;">❖</span>
 * @returns void
 */
export function SUCCESS(
  message: string | number | null | undefined | boolean,
  prefix: string = '❖',
) {
  _p(`${prefixList.success(prefix)} ${message}`);
}
