import { _p } from 'a-node-tools';
import {
  bgHexPen,
  brightCyanPen,
  brightGreenPen,
  brightMagentaPen,
  brightRedPen,
  brightYellowPen,
  hexPen,
} from 'color-pen';
/**
 * 默认为暗黑色 <span style="color:#666;">（#666）的 🖊️</span>
 */
export const pen666 = hexPen('#666');

/**
 * 默认为暗黑色 <span style="background:#666;">背景（#666）的 🖊️</span>
 */
export const bgPen666 = bgHexPen('#666');

export const prefixList = {
  /**
   * 提示
   *
   * 默认为绿色的 <span style="color:#2ceeec;">✦</span>
   * */
  info: (prefix: string = '✦') => brightCyanPen(prefix),
  /**
   * 完成
   *
   * 默认为绿色的 <span style="color:#2fe81a;">❖</span>
   * */
  success: (prefix: string = '❖') => brightGreenPen(prefix),
  /**
   * 当前项
   *
   * 默认为黄色的 <span style="color:#e8ec14;">▶︎</span>
   * */
  current: (prefix: string = '▶︎') => brightYellowPen(prefix),
  /**
   *  警示
   *
   * 默认为洋红色的 <span style="color:#fb00fa;">◼︎</span>
   *
   */
  warn: (prefix: string = '◼︎') => brightMagentaPen(prefix),
  /**
   *   错误
   *
   * 默认为红色的 <span style="color:#fc2119;">⚉</span>
   */
  error: (prefix: string = '⚉') => brightRedPen(prefix),
  /**
   *
   * 单选的未选中
   *
   * 默认为暗黑色（#666）的 <span style="color:#666;">◦</span>
   */
  radioNoSelect: (prefix: string = '◦') => hexPen('#666')(prefix),
  /**
   *
   * 单选的选中
   *
   * 默认为绿色（#2fe81a）的 <span style="color:#2fe81a;">⚉</span>
   */
  radioSelect: (prefix: string = '●') => brightGreenPen.blink(prefix),
  /**
   *
   * 多选未选择未聚焦
   *
   * 默认为暗黑色（#666）的 <span style="color:#666;">□</span>
   *
   */
  multipleChoice: (prefix: string = '□') => pen666(prefix),
  /**
   *
   * 多选聚焦未选择
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">□</span>
   *
   */
  multipleChoiceFocus: (prefix: string = '□') => brightGreenPen.blink(prefix),
  /**
   *
   * 多选选择未聚焦
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">■</span>
   *
   */
  multipleChoiceChecked: (prefix: string = '■') => pen666(prefix),
  /**
   *
   * 多选选择聚焦
   *
   * 默认为暗黑色（#2fe81a）的 <span style="color:#2fe81a;">■</span>
   *
   */
  multipleChoiceCheckedFocus: (prefix: string = '■') =>
    brightGreenPen.blink(prefix),
} as const;

/**  省略号  */
export const ellipsis = pen666('.'.repeat(3));

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
