/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName manageResult.ts
 *  @CreateDate  周四  04/10/2025
 *  @Description  解析用户参数数据
 *
 * 该解析说明已经经过了 `-v` 和 `-h` 命令的检测
 *
 * 当前已经是一个完整的参数，开始解析
 *
 *
 * 因为要处理含 `=` 的参数，所以不打算将预处理 pretreatment 方法并入该方法中
 *
 * 即便多了一次遍历，不但对性能无影响，而且也能减少代码量
 ****************************************************************************/
import { AuxiliaryData } from '../../data-store/auxiliaryData';
import { dataIsValue } from './dataIsValue';
import { dataIsCode } from './dataIsCode';
import { dataIsOption } from './dataIsOption';
import { addResultItem } from './addResultItem';
import { ManageDataType } from './types';
import { pretreatment } from './pretreatment';

/**
 *
 *
 *  参数整理函数
 *
 * @param data          待整理数据，用户输入的参数
 * @param auxiliaryData  辅助数据
 * @param manageData    管理数据，处理过程中数据
 *
 */
export function manageResult(
  data: string[],
  auxiliaryData: AuxiliaryData,
  manageData: ManageDataType,
): void {
  // 数据重置，防止数据污染
  // （旧的使用方法，现每一次都使用函数返回的新数据，原则上可移除该方法）
  manageData.init();

  data = pretreatment(
    data.filter(e => e !== ''),
    auxiliaryData,
  ); // 预处理

  // 解析每一个参数
  data.forEach((currentArg: string) => {
    const { name } = manageData;
    currentArg = currentArg.trim();

    // 在使用 pretreatment 处理前，已经将空字符串过滤了
    // 过滤空字符串，原则上不会出现该情况。除非用户显式的使用 '' 作为参数值
    // if (!currentArg) return;

    // 当前以数值为开始的字符串判定为值
    if (!/^([a-z]|[A-Z]|-|\$|_)/.test(currentArg)) {
      return dataIsValue(currentArg, manageData);
    }

    // 当尚未有匹配项时，检测是否有上一次匹配的项
    // 查看是否为 options 全拼
    if (
      name !== '' &&
      auxiliaryData.originalBind[name].options &&
      auxiliaryData.originalBind[name].options[currentArg]
    ) {
      return dataIsOption(currentArg, manageData);
    }
    // 缩写已在 pretreatment 中转化为全拼
    // 参看是否为 options 的缩写
    // else if (auxiliaryData.abbr[`${name}^${currentArg}`]) {
    //   temp2 = auxiliaryData.abbr[`${name}^${currentArg}`];
    // }
    // 当有已匹配，先以检测子项为准

    //  查看是否为全拼
    if (auxiliaryData.originalBind[currentArg]) {
      return dataIsCode(currentArg, manageData);
    }
    // 缩写在预处理  pretreatment 中已经转化为全拼
    // 参看是否为缩写
    // else if (auxiliaryData.abbr[currentArg]) {
    //   temp1 = auxiliaryData.abbr[currentArg];
    // }
    // 子项未匹配，再次检测是否为匹配项
    // 当未匹配，则认定为有效值
    return dataIsValue(currentArg, manageData);
  });

  /**  作为值处理数据 */
  addResultItem(manageData);
}
