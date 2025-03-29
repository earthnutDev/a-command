import { _p } from 'a-node-tools';
import { AuxiliaryData } from './auxiliaryData';
import { organizeHelpInformation } from './organizeHelpInformation';
import paringUserArgs from './paringUserArgs';

/**
 *
 *  开始执行  run ，解析用户行为
 */
export default function executeParsing(auxiliaryData: AuxiliaryData) {
  switch (auxiliaryData.state.code) {
    case 3:
      _p('已经执行过 `run`');
      return;
    case 4:
      _p('已完成全部');
      return;
    default:
      auxiliaryData.state = 3;
  }
  paringUserArgs(auxiliaryData);
  beforeRun(auxiliaryData);
  /** Trigger User Help Document
   *
   * 触发帮助文档 */
  if (auxiliaryData.helpInfo != '')
    return organizeHelpInformation(auxiliaryData);
}

/**
 *
 * 执行冷冻数据
 */
function beforeRun(auxiliaryData: AuxiliaryData) {
  ['name', 'originBind', 'abbr'].forEach((currentEle: string) => {
    if (auxiliaryData[currentEle as never]) {
      Object.freeze(auxiliaryData[currentEle as never]);
      Object.defineProperty(auxiliaryData, currentEle, {
        value: auxiliaryData[currentEle as never],
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  });
}
