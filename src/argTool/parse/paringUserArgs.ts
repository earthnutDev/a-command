/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName index.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 解析用户的输入参数
 ****************************************************************************/
import { AuxiliaryData } from '../auxiliaryData';
import { ArgsType, OptionNameArray } from '../types';
import { createManageDate } from './createManageData';
import { manageResult } from './manageResult';
import { delimiter } from './delimiter';

/**
 *
 *
 * 解析用户参数
 *
 *
 * 将用的输入参数解析为一个数组，数组包含匹配（可能有重复的）的每一项
 *
 * @param auxiliaryData 辅助数据, 包含了用户输入的参数原始数据
 *
 * ```ts
 *   result :  {
 *        name:string,
 *        value?: boolean|string[] ,
 *        options?: {
 *            name: string,
 *            value: boolean|string[]
 *        }[]
 *     } []
 *
 * ```
 */
export default function paringUserArgs(auxiliaryData: AuxiliaryData): void {
  // 用户没有传参数
  if (process.argv.length == 2) return;

  /**    获取用户输入参数 */
  const _args = auxiliaryData.originalArg,
    /**  拼接成一个字符串，方便正则匹配 */
    _argString = `${delimiter}${_args.join(delimiter)}${delimiter}`;

  /**  检测是否含有需求帮助文档 ,包含则返回第一个匹配的项的帮助，未找到则返回主帮助信息 */
  const help_index = _args.findIndex((currentArg: string) =>
    /^(-h|help)$/.test(currentArg),
  );

  /**  创建符合分隔符的正则对象  */
  const versionRegExp = new RegExp(`${delimiter}(-v|version)${delimiter}`, 'i');
  /**
   * 命令中含有 -v 展示当前版本
   *
   * 在创建 _argString 时，以 `^` 作为分隔符，所以这里使用 `^` 作为正则匹配的分隔符
   */
  if (versionRegExp.test(_argString)) {
    return;
  }

  /// 倘若在 `-h`  第一位
  if (help_index == 0) {
    auxiliaryData.helpInfo = 'help';
    return;
  }

  /**  结果集  */
  let result: {
    name: string;
    value: (string | number | boolean)[];
    options: {
      name: string;
      value?: (string | number | boolean[])[];
    }[];
  }[] = [];

  /**  由方法创建出一个临时的管理数据。使用方法创建可以保证数据的单一性和不可污染性  */
  const manageData = createManageDate();
  /**
   *  命令含有  -h
   *
   *  这里就不太关注没有匹配值时候的，即 `manageData.values`
   *
   *  但是为了防止其他人使用的时候便捷，这里考虑导出该值，但不会导出到 `auxiliaryData.args`
   *
   *  因为前面已经做了在位置 0 的判断，所以这里直接以 `> 0` 为判断标准
   */
  if (help_index > 0) {
    // 仅截断参数到已检测到第一个 `-h` 后 `help`  的位置，舍弃后面的参数
    manageResult(_args.slice(0, help_index + 1), auxiliaryData, manageData);
    auxiliaryData.values = manageData.values;
    auxiliaryData.args =
      manageData.result as unknown as ArgsType<OptionNameArray>;
    // 设定值
    result = auxiliaryData.args as unknown as never;
    /// 未匹配到子命令或选项，即非详细帮助文档模式
    if (result.length == 0) {
      auxiliaryData.helpInfo = 'help';
    }
    // 匹配到子命令，即子命令的详细帮助文档模式
    else if (result[0].options == undefined || result[0].options?.length == 0) {
      auxiliaryData.helpInfo = result[0].name;
    }
    // 匹配到子命令和选项，即子命令和选项的详细帮助文档模式
    else {
      auxiliaryData.helpInfo = [result[0].name, result[0].options[0].name];
    }
  } else {
    /// 即标准模式
    manageResult(_args, auxiliaryData, manageData);
    auxiliaryData.values = manageData.values;
    // 正常的解析
    auxiliaryData.args =
      manageData.result as unknown as ArgsType<OptionNameArray>;
  }
}
