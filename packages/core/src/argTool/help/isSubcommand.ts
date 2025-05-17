import { _p } from 'a-node-tools';
import { AuxiliaryData } from '../auxiliaryData';
import { pen } from 'color-pen';
import { _blank } from './blank';
import { printLine } from './printLine';

/**
 *
 * 打印某一个子命令的帮助信息
 *
 */
export function isSubcommand(auxiliaryData: AuxiliaryData, subcommand: string) {
  const data = auxiliaryData.originalBind[subcommand];

  _p(`${_blank}${data.name}${_blank}${pen.magenta(data.info)}\n`);
  // 带选项的这里打印
  if (data.options && Object.keys(data.options).length > 0) {
    /**  打印带选项的帮助信息  */
    const message = `${pen.yellow(`${_blank}使用:`)}  ${auxiliaryData.name}   ${
      subcommand
    }   [subOptions/subAbbr  [value]]\n`;

    _p(message);

    /**  打印子选项  */
    _p(`${pen.cyan(`${_blank}subOptions:`)} \n`);

    printLine(data.options || {});
  }
  // 没有带选项的
  else {
    /**  打印没有带选项的帮助信息  */
    const message = `${pen.green(`${_blank}使用:`)}  ${auxiliaryData.name}   ${
      subcommand
    }    [value]\n`;

    _p(message);
  }
}
