import { _p } from 'a-node-tools';
import { formatHelpText } from './formatHelpText';
import { ArgOriginBind, SubOptionsType } from '../bind/types';
import { isEmptyObject } from 'a-type-of-js';

/**
 * 打印其他信息
 *
 *
 * @param data 绑定的数据，可为 `argOriginBind` 或 `options`
 *
 * @type
 *
 *  ```ts
 *  type ArgOriginBind = {
 *     [key: string]: {
 *         name: string;
 *         info: string;
 *         abbr: string;
 *         options: {
 *             [key: string]: SubOptionsType;
 *         };
 *     };
 * }
 * ```
 */
export function printLine(
  data: ArgOriginBind | { [key: string]: SubOptionsType },
): number {
  const keys = Object.keys(data).sort();
  /** 限定 option  字符数  */
  let maxLength: number = 8;
  const name: string = '子命令',
    abbr: string | undefined = '缩写',
    info: string = '描述';
  /** 查找最大字符数字符 */
  keys.forEach(
    (currentEle: string) =>
      (maxLength = Math.max(maxLength, currentEle.length)),
  );
  const len = Math.min(15, maxLength + 1);
  _p(formatHelpText({ len, name, info, abbr, color: false }));
  _p('');
  keys.forEach((currentKey: string) => {
    const { name, abbr, info } = data[currentKey];
    /**  文本装饰 🎍 */
    let textDecoration = false;
    if (
      'options' in data[currentKey] &&
      !isEmptyObject(data[currentKey].options)
    ) {
      textDecoration = true;
    }

    _p(formatHelpText({ len, name, info, abbr, textDecoration }));
    _p('');
  });

  return len;
}
