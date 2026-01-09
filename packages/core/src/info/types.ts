/**
 * @file types.ts
 * @description 类型
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  info
 * @since 2026-01-09 10:07
 * @lastModified 2026-01-09 10:08
 **/

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
