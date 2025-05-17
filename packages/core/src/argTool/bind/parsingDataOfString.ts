/**
 * 解析当绑定数 据为字符串类型
 *
 * @returns 返回是 [string, string, string] ，对应了 [name , abbr , info];
 */
export function parsingDataOfString(data: string): [string, string, string] {
  const name = data.replace(/^(.*?)\s.*/gm, '$1') || '';
  const abbr = (/<.+>/.test(data) && data.replace(/.*<(.+)>.*/, '$1')) || '';
  const info = data.replace(/.*?\((.*)\).*?/, '$1') || '';
  return [name, abbr, info];
}
