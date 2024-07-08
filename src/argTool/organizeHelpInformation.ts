import { _p, Color, t } from 'ismi-node-tools';
import { AuxiliaryData } from './auxiliaryData';
import { ArgOriginBind, SubOptionsType } from './types';
/** 空白 */
const _blank = '\x20'.repeat(4);
/** organize help information
 *
 *  整理帮助信息
 */
export function organizeHelpInformation(auxiliaryData: AuxiliaryData) {
  auxiliaryData.state = 4;
  /**
   *
   *  某一 option
   */
  if (
    typeof auxiliaryData.helpInfo == 'string' &&
    auxiliaryData.helpInfo !== 'help'
  ) {
    const data = auxiliaryData.originalBind[auxiliaryData.helpInfo];
    _p(`${_blank}${data.name}${_blank}${Color.magenta(data.info)}\n\n`);
    // 带子项的这里打印
    if (data.options && Object.keys(data.options).length > 0) {
      _p(
        `${Color.darkYellow(`${_blank}use:`)}  ${auxiliaryData.name}   ${
          auxiliaryData.helpInfo
        }   [subOptions/subAbbr  [value]]\n\n`,
      );
      _p(`${Color.cyan(`${_blank}subOptions:`)} \n\n`);
      printHelpOther(data.options || {});
    } else {
      _p(
        `${Color.green(`${_blank}use:`)}  ${auxiliaryData.name}   ${
          auxiliaryData.helpInfo
        }    [value]\n\n`,
      );
    }
  } else if (
    /**
     *
     * 某一 subOption
     */
    Array.isArray(auxiliaryData.helpInfo) &&
    (auxiliaryData.helpInfo as string[]).length == 2
  ) {
    _p(
      `${Color.cyan(' you can use:')}  ${auxiliaryData.name}   ${(
        auxiliaryData.helpInfo as []
      ).join('   ')}   [value]\n ${Color.green(' description:')} ${
        auxiliaryData.originalBind[auxiliaryData.helpInfo[0]]['options'][
          auxiliaryData.helpInfo[1]
        ].info
      }\n`,
    );
  } else {
    /** Follow up on configuration help documents
     *
     * 配置帮助文档
     */
    _p(
      `${Color.darkRed(' you can use:')}  ${
        auxiliaryData.name
      }  options/abbr  [subOptions/subAbbr  [value]]\n\n${Color.random(
        'options:',
      )}\n\n`,
    );
    printHelpOther(auxiliaryData.originalBind, true);
  }
}

/**
 * 打印其他信息
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

function printHelpOther(
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
  _p('\n\n');
  keys.forEach((currentKey: string) => {
    // @ts-expect-error 下面对 options 做了 undefined 判断，这里是有意为之
    const { name, abbr, info, options } = data[currentKey];
    const textDecoration = options && Object.keys(options).length > 0;
    _p(formatHelpText({ len, name, info, abbr, textDecoration }));
    _p('\n');
  });
  /** 打印必须项 */
  if (printOther) {
    _otherMustInfo.forEach((currentEle: string) => {
      const [name, abbr, info] = currentEle.split('\x20');
      _p(formatHelpText({ len, name, info, abbr }));
      _p('\n');
    });
  }
}

/**  Format help text so that their values are in the same column
 *  ```ts
 *    type param =  {
 *        name: string ,
 *        info?: string,
 *        abbr?: string | undefined ,
 *        len :number= 15,    // default = 15
 *        color:  boolean  // default = true
 *    }
 *    ```
 * 格式化帮助文本，让他们值在同一列
 */
function formatHelpText(_d: {
  name: string;
  info?: string;
  abbr?: string;
  len?: number;
  color?: boolean;
  textDecoration?: boolean;
}) {
  const abbrLimitLength = 6,
    data = Object.assign(
      {
        name: '',
        info: '',
        abbr: '',
        len: 15,
        color: true,
        textDecoration: false,
      },
      _d,
    );
  let str = `${t}${(data.color && 32) || ''}m${_blank}`;
  // 打印含子项的特殊标志
  str += data.textDecoration ? `${t}34;4m` : '';
  // 打印 name
  str += `${data.name.slice(0, data.len)}${t}m`;
  // 打印空白字符
  str += ' '.repeat(data.len + 1 - computerCodePoint(data.name, data.len));
  // 打印 abbr
  str += `${t}${(data.color && 33) || ''}m${
    data.abbr?.slice(0, abbrLimitLength) || ''
  }`;
  // 打印空白字符
  str += ' '.repeat(
    abbrLimitLength + 1 - computerCodePoint(data.abbr || '', abbrLimitLength),
  );
  // 打印 description
  str += data.color ? Color.magenta(data.info) : data.info;
  return str;
}

/**
 *
 * 返回字符计数
 */
function computerCodePoint(str: string, limit: number): number {
  // eslint-disable-next-line no-control-regex
  return Math.min(str.replace(/[^\x00-\x7f]/, '11').length, limit);
}
