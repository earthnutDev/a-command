/**
 *  @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @packageDocumentation
 * @module  a-command
 *  @file organizeHelpInformation.ts
 *  @since 04/08/2025
 *  @description 展示帮助 💻
 *
 * 根据输入的帮助信息的层级展示对应层级的帮助信息
 **/

import { isArray, isString } from 'a-type-of-js';
import { AuxiliaryData } from '../auxiliaryData';
import { isAllHelpInformation } from './isAllHelpInformation';
import { isOptions } from './isOptions';
import { isSubcommand } from './isSubcommand';

/** organize help information
 *
 *  整理帮助信息
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
