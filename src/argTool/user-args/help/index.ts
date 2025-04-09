/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName organizeHelpInformation.ts
 *  @CreateDate  周二  04/08/2025
 *  @Description 展示帮助 💻
 *
 * 根据输入的帮助信息的层级展示对应层级的帮助信息
 ****************************************************************************/
import { _p } from 'a-node-tools';
import { AuxiliaryData } from '../../data-store/auxiliaryData';
import { pen } from 'color-pen';
import { isArray, isString } from 'a-type-of-js';
import { _blank } from './blank';
import { printHelpOther } from './printHelpOther';

/** organize help information
 *
 *  整理帮助信息
 */
export function organizeHelpInformation(auxiliaryData: AuxiliaryData) {
  // 设定当前状态
  auxiliaryData.state = 'help';
  /**
   *
   *  某一 option
   */
  if (isString(auxiliaryData.helpInfo) && auxiliaryData.helpInfo !== 'help') {
    const data = auxiliaryData.originalBind[auxiliaryData.helpInfo];
    _p(`${_blank}${data.name}${_blank}${pen.magenta(data.info)}\n`);
    // 带子项的这里打印
    if (data.options && Object.keys(data.options).length > 0) {
      _p(
        `${pen.yellow(`${_blank}use:`)}  ${auxiliaryData.name}   ${
          auxiliaryData.helpInfo
        }   [subOptions/subAbbr  [value]]\n`,
      );
      _p(`${pen.cyan(`${_blank}subOptions:`)} \n`);
      printHelpOther(data.options || {});
    } else {
      _p(
        `${pen.green(`${_blank}use:`)}  ${auxiliaryData.name}   ${
          auxiliaryData.helpInfo
        }    [value]\n`,
      );
    }
  } else if (
    /**
     *
     * 某一 subOption
     */
    isArray(auxiliaryData.helpInfo) &&
    (auxiliaryData.helpInfo as string[]).length == 2
  ) {
    _p(
      `${pen.cyan(' you can use:')}  ${auxiliaryData.name}   ${(
        auxiliaryData.helpInfo as []
      ).join('   ')}   [value]\n ${pen.green(' description:')} ${
        auxiliaryData.originalBind[auxiliaryData.helpInfo[0]]['options'][
          auxiliaryData.helpInfo[1]
        ].info
      }`,
    );
  } else {
    /**
     *
     * 配置帮助文档
     */
    _p(
      `${pen.brightRed(' you can use:')}  ${
        auxiliaryData.name
      }  options/abbr  [subOptions/subAbbr  [value]]\n\n${pen.random(
        'options:',
      )}\n`,
    );
    printHelpOther(auxiliaryData.originalBind, true);
  }
}
