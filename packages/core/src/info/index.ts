/**
 * @file info.ts
 * @description 构建输入
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  info
 * @since 2026-01-09 09:43
 * @lastModified 2026-01-09 17:03
 **/

import { _p } from 'a-node-tools';
import { prefixList } from './info';

/**
 *  警示
 *
 * 默认为洋红色的 <span style="color:#fb00fa;">◼︎</span>
 *
 * @param message  将打印的消息
 * @param prefix 前置标记
 * @returns void
 */
function WARN(message: string, prefix?: string) {
  _p(`${prefixList.warn(prefix)} ${message}`);
}

/**
 * 当前项
 *
 * 默认为黄色的 <span style="color:#e8ec14;">▶︎</span>
 *
 * @param message 将打印文本消息
 * @param prefix  前置标志符
 * */
function CURRENT(message: string, prefix?: string) {
  _p(`${prefixList.current(prefix)} ${message}`);
}

/**
 *  提示信息
 *
 *  * 默认为绿色的 <span style="color:#2ceeec;">✦</span>
 * @param message 将打印的信息文本
 * @param prefix 前置
 */
function INFO(message: string, prefix?: string) {
  _p(`${prefixList.info(prefix)} ${message}`);
}

export type { PrintOption, CommandPrintOption } from './types';
export { ERROR, SUCCESS } from './info';

export { WARN, prefixList, CURRENT, INFO };
