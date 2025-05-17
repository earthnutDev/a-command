import { _p } from 'a-node-tools';
import { formatHelpText } from './formatHelpText';

/**
 *
 * 打印帮助和版本信息
 *
 * @param len    限定 option  字符数
 *
 */
export function printHelpAndVersion(len: number) {
  ['version -v 版本描述', 'help -h 帮助查看'].forEach((currentEle: string) => {
    const [name, abbr, info] = currentEle.split('\x20');
    _p(formatHelpText({ len, name, info, abbr }));
    _p('');
  });
}
