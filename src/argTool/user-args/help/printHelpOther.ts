import { _p } from 'a-node-tools';
import { ArgOriginBind, SubOptionsType } from '../../types';
import { formatHelpText } from './formatHelpText';

/**
 * 打印其他信息
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
export function printHelpOther(
  data: ArgOriginBind | { [key: string]: SubOptionsType },
  printOther?: boolean,
) {
  // 其他必须的信息
  const _otherMustInfo = ['version -v 版本描述', 'help -h 帮助查看'];
  const keys = Object.keys(data).sort();
  /** 限定 option  字符数  */
  let maxLength: number = 8;
  const name: string = 'name',
    abbr: string | undefined = 'abbr',
    info: string = 'description';
  /** 查找最大字符数字符 */
  keys.forEach(
    (currentEle: string) =>
      (maxLength = Math.max(maxLength, currentEle.length)),
  );
  const len = Math.min(15, maxLength + 1);
  _p(formatHelpText({ len, name, info, abbr, color: false }));
  _p('');
  keys.forEach((currentKey: string) => {
    // @ts-expect-error 下面对 options 做了 undefined 判断，这里是有意为之
    const { name, abbr, info, options } = data[currentKey];
    const textDecoration = options && Object.keys(options).length > 0;
    _p(formatHelpText({ len, name, info, abbr, textDecoration }));
    _p('');
  });
  /** 打印必须项 */
  if (printOther) {
    _otherMustInfo.forEach((currentEle: string) => {
      const [name, abbr, info] = currentEle.split('\x20');
      _p(formatHelpText({ len, name, info, abbr }));
      _p('');
    });
  }
}
