/**
 * @file pen.ts
 * @description 笔
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  utils
 * @since 2026-01-09 10:09
 * @lastModified 2026-01-09 10:14
 */

import { bgHexPen, hexPen } from 'color-pen';

/**
 * 默认为暗黑色 <span style="color:#333;">（#333）的 🖊️</span>
 */
export const pen333 = hexPen('#333');
/**
 * 默认为暗黑色 <span style="color:#666;">（#666）的 🖊️</span>
 */
export const pen666 = hexPen('#666');

/**
 * 默认为暗黑色 <span style="color:#999;">（#999）的 🖊️</span>
 */
export const pen999 = hexPen('#aaa');

/**
 * 默认为暗黑色 <span style="background:#666;">背景（#666）的 🖊️</span>
 */
export const bgPen666 = bgHexPen('#666');

/**  省略号  */
export const ellipsis = pen666('.'.repeat(3));
