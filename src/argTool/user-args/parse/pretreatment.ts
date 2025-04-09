import { isUndefined } from 'a-type-of-js';
import { AuxiliaryData } from 'src/argTool/data-store/auxiliaryData';

/**
 *
 * 数据预处理，不储存数据名，单纯将短写的参数展开及使用 "=" 的参数展开
 *
 */
export function pretreatment(data: string[], auxiliaryData: AuxiliaryData) {
  /** 处理后的参数 */
  const result: string[] = [];
  /** 临时储存值 */
  let currentSubcommand: string = '';

  /** 结果处理   */
  const pushResult = (arg: string, value?: string) =>
    isUndefined(value) ? result.push(arg) : result.push(arg, value);

  /**  方法重用  */
  function manage(currentArg: string, secondParameter?: string) {
    if (currentSubcommand !== '') {
      // 是子命令的选项时
      if (auxiliaryData.originalBind[currentSubcommand].options[currentArg]) {
        return pushResult(currentArg, secondParameter);
      }
      const optionFullSpelling =
        auxiliaryData.abbr[`${currentSubcommand}^${currentArg}`];
      // 是子命令的选项缩写时
      if (!isUndefined(optionFullSpelling)) {
        return pushResult(optionFullSpelling, secondParameter);
      }
    }
    // 是子命令全拼
    if (auxiliaryData.originalBind[currentArg]) {
      currentSubcommand = currentArg;
      return pushResult(currentArg, secondParameter);
    }
    // 是子命令缩写
    else if (auxiliaryData.abbr[currentArg]) {
      currentArg = auxiliaryData.abbr[currentArg];
      currentSubcommand = currentArg;
      return pushResult(currentArg, secondParameter);
    }
    // 是普通的参数，且有 "=" 时，拆解并分析数据行为
    if (currentArg.includes('=')) {
      const [first, second] = currentArg.split('=');
      return manage(first, second);
    }
    // 是普通的参数，且没有 "=" 时
    return isUndefined(secondParameter)
      ? result.push(currentArg)
      : result.push(`${currentArg}=${secondParameter}`);
  }
  data.forEach(currentArg => manage(currentArg));
  return result;
}
