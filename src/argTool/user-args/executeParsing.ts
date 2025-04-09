/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName executeParsing.ts
 *  @CreateDate  周二  04/08/2025
 *  @Description 解析用户行为
 ****************************************************************************/
import { _p } from 'a-node-tools';
import { AuxiliaryData } from '../data-store/auxiliaryData';
import { organizeHelpInformation } from './help';
import paringUserArgs from './parse';

/**
 *
 *  开始执行 run ，解析绑定数据
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

  // 解析用户行为
  paringUserArgs(auxiliaryData);

  // 冷冻数据
  beforeRun(auxiliaryData);

  // * 触发帮助文档
  if (auxiliaryData.helpInfo != '') {
    return organizeHelpInformation(auxiliaryData);
  }
}

/**
 *
 * 执行冷冻数据
 *
 *
 */
function beforeRun(auxiliaryData: AuxiliaryData) {
  ['name', 'originBind', 'abbr'].forEach((currentEle: string) => {
    // 进行格式转化
    const currentValue = currentEle as never as keyof AuxiliaryData;
    // 判断是否存在该值
    if (auxiliaryData[currentValue]) {
      // 执行数据冷冻
      Object.freeze(auxiliaryData[currentValue]);
      // 将数据添加到辅助数据中并冻结
      Object.defineProperty(auxiliaryData, currentEle, {
        value: auxiliaryData[currentValue],
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  });
}
