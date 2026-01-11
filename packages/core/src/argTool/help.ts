/**
 * @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @packageDocumentation
 * @module  a-command
 * @file help.ts
 * @since 04/08/2025
 * @description 展示帮助 💻
 *
 * 根据输入的帮助信息的层级展示对应层级的帮助信息
 */

import { _p } from 'a-node-tools';
import { isArray, isEmptyObject, isString } from 'a-type-of-js';
import {
  brightRedPen,
  cyanPen,
  greenPen,
  magentaPen,
  pen,
  yellowPen,
} from 'color-pen';
import { AuxiliaryData } from './auxiliaryData';
import { ArgOriginBind, SubOptionsType } from './bind/types';

/** 空白 */
const _blank = '\x20'.repeat(4);

/** organize help information
 *
 *  整理帮助信息
 * @param auxiliaryData
 */
export function organizeHelpInformation(auxiliaryData: AuxiliaryData) {
  // 设定当前状态
  auxiliaryData.state = 'help';

  // 某一子命令
  if (isString(auxiliaryData.helpInfo) && auxiliaryData.helpInfo !== 'help') {
    return isSubcommand(auxiliaryData, auxiliaryData.helpInfo);
  }
  // 某一选项
  else if (
    isArray(auxiliaryData.helpInfo) &&
    (auxiliaryData.helpInfo as string[]).length == 2
  ) {
    return isOptions(auxiliaryData);
  }
  // 打印所有的帮助文档
  else {
    return isAllHelpInformation(auxiliaryData);
  }
}

// ===== 模块 =====

/**
 *
 * 打印某一个子命令的帮助信息
 *
 * @param auxiliaryData
 * @param subcommand
 */
export function isSubcommand(auxiliaryData: AuxiliaryData, subcommand: string) {
  const data = auxiliaryData.originalBind[subcommand];

  _p(`${_blank}${data.name}${_blank}${magentaPen(data.info)}\n`);
  // 带选项的这里打印
  if (data.options && !isEmptyObject(data.options)) {
    /**  打印带选项的帮助信息  */
    const message = `${yellowPen(`${_blank}使用:`)}  ${auxiliaryData.name}   ${
      subcommand
    }   [subOptions/subAbbr  [value]]\n`;

    _p(message);

    /**  打印子选项  */
    _p(`${cyanPen(`${_blank}subOptions:`)} \n`);

    printLine(data.options || {});
  }
  // 没有带选项的
  else {
    /**  打印没有带选项的帮助信息  */
    const message = `${greenPen(`${_blank}使用:`)}  ${auxiliaryData.name}   ${
      subcommand
    }    [value]\n`;

    _p(message);
  }
}

// ===== 模块 =====

/**
 *
 * 打印所有的子命令
 *
 * @param auxiliaryData
 */
export function isAllHelpInformation(auxiliaryData: AuxiliaryData) {
  _p(
    `${brightRedPen(' 可使用:')}  ${
      auxiliaryData.name
    }  options/abbr  [subOptions/subAbbr  [value]]\n\n选项:\n`,
  );
  const len = printLine(auxiliaryData.originalBind);

  /** 打印必须项 */
  printHelpAndVersion(len);
}

/**
 * ## 打印帮助和版本信息
 * @param len    限定 option  字符数
 */
function printHelpAndVersion(len: number) {
  ['version -v 版本描述', 'help -h 帮助查看'].forEach((currentEle: string) => {
    const [name, abbr, info] = currentEle.split('\x20');
    _p(formatHelpText({ len, name, info, abbr }));
    _p('');
  });
}

/**
 * ##  打印其他信息
 * @param data 绑定的数据，可为 `argOriginBind` 或 `options`
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
function printLine(
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

/**
 *
 *  打印某一个选项的帮助信息
 *
 * @param auxiliaryData
 */
function isOptions(auxiliaryData: AuxiliaryData): void {
  const commandName = auxiliaryData.name;
  const subCommandWithOptions = (auxiliaryData.helpInfo as []).join('   ');
  const subCommandDescribe =
    auxiliaryData.originalBind[auxiliaryData.helpInfo[0]]['options']![
      auxiliaryData.helpInfo[1]
    ].info;

  _p(
    `${cyanPen(' 可使用:')}  ${commandName}   ${subCommandWithOptions}   [value]
${greenPen(' 描述:')} ${subCommandDescribe}`,
  );
}

/**
 * 格式化帮助文本，让他们值在同一列
 *
 * @type
 *
 *  ```ts
 *    type param =  {
 *        name: string ,
 *        info?: string,
 *        abbr?: string | undefined ,
 *        len :number= 15,    // default = 15
 *        color:  boolean  // default = true
 *    }
 *    ```
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
  let str = pen[data.color ? 'green' : 'black'](_blank);
  // 打印含子项的特殊标志
  // 打印 name
  str += pen[data.textDecoration ? 'blue' : 'black'](
    data.name.slice(0, data.len),
  );
  // 打印空白字符
  str += ' '.repeat(data.len + 1 - computerCodePoint(data.name, data.len));
  // 打印 abbr
  str += pen[data.color ? 'yellow' : 'black']`${
    data.abbr?.slice(0, abbrLimitLength) || ''
  }${' '.repeat(
    abbrLimitLength + 1 - computerCodePoint(data.abbr || '', abbrLimitLength),
  )}`;
  // 打印空白字符
  // 打印 description
  str += data.color ? magentaPen(data.info) : data.info;
  return str;
}

/**
 *
 * 返回字符计数
 * @param str
 * @param limit
 */
function computerCodePoint(str: string, limit: number): number {
  // eslint-disable-next-line no-control-regex
  return Math.min(str.replace(/[^\x00-\x7f]/, '11').length, limit);
}
