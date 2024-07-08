import { _p } from 'ismi-node-tools';
import { AuxiliaryData } from './auxiliaryData';
import { organizeHelpInformation } from './organizeHelpInformation';
import paringUserArgs from './paringUserArgs';

/**  Perform  analyzing  users
 *
 *  开始执行  run ，解析用户行为
 */
export default function executeParsing(auxiliaryData: AuxiliaryData) {
  switch (auxiliaryData.state.code) {
    case 3:
      _p('已经执行过 `run`\n');
      return;
    case 4:
      _p('已完成全部\n');
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

/** Execute frozen data
 *
 * 执行冷冻数据
 */
function beforeRun(auxiliaryData: AuxiliaryData) {
  ['name', 'originBind', 'abbr'].forEach((currentEle: string) => {
    // @ts-expect-error 冷冻属性（这里有判断，但是 ts 未识别， eslint 又不让 as any）
    if (auxiliaryData[currentEle]) {
      // @ts-expect-error 冷冻属性
      Object.freeze(auxiliaryData[currentEle]);
      Object.defineProperty(auxiliaryData, currentEle, {
        // @ts-expect-error 冷冻属性
        value: auxiliaryData[currentEle],
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  });
}
