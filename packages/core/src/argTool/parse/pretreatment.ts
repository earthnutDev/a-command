import { isBusinessEmptyString, isUndefined } from 'a-type-of-js';
import { AuxiliaryData } from '../auxiliaryData';

/**
 *
 * 数据预处理，不储存数据名，单纯将短写的参数展开及使用 "=" 的参数展开
 *
 * @param data
 * @param auxiliaryData
 */
export function pretreatment(data: string[], auxiliaryData: AuxiliaryData) {
  /** 处理后的参数 */
  const result: string[] = [];
  /** 临时储存第二命令。用户判断次级命令 */
  let currentSubcommand: string = '';

  /**
   * 结果处理
   * @param arg
   * @param value
   */
  const pushResult = (arg: string, value?: string) =>
    isUndefined(value) || isBusinessEmptyString(value)
      ? result.push(arg)
      : result.push(arg, value);

  /**
   *
   * 分析并参数并将结果转化为标准的全拼追加到值（只有含 `=` 的默认上会包含第二参数）
   *
   * @param currentArg  当前需要分析的命令
   * @param secondParameter  当命令本身包含 `=` 时触发循环解析作为值使用
   *
   */
  function manage(currentArg: string, secondParameter?: string) {
    if (!isBusinessEmptyString(currentSubcommand)) {
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
      // 这里导致了含双 “=” 情况下的问题
      // const [first, second] = currentArg.split('=');
      const equalSignIndex = currentArg.indexOf('=');
      // 等号在第一位（此时第二位不会有值）
      if (equalSignIndex === 0 || equalSignIndex === currentArg.length - 1)
        return result.push(currentArg);
      const [first, second] = [
        currentArg.slice(0, equalSignIndex),
        currentArg.slice(equalSignIndex + 1) || 'true',
      ];
      return manage(first, second);
    }
    // 是普通的参数，且没有 "=" 时，如果含第二参数，需要还原为含等号的模式
    return isUndefined(secondParameter) ||
      isBusinessEmptyString(secondParameter)
      ? result.push(currentArg)
      : result.push(`${currentArg}=${secondParameter}`);
  }
  data.forEach(currentArg => manage(currentArg));
  return result;
}
