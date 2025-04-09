/**
 *
 * 返回字符计数
 */
export function computerCodePoint(str: string, limit: number): number {
  // eslint-disable-next-line no-control-regex
  return Math.min(str.replace(/[^\x00-\x7f]/, '11').length, limit);
}
