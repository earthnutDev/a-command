import { core } from './core';
import { QuestionParamData, QuestionReturn, QuestionVerify } from './types';

/**
 * ## 一个向提问的并收集用户答录
 * @param params     参数，可以是 string、ParamDataType 或是他们组成的数组
 * @param simpleResult   是否显示为简单模式的返回（默认返回是答案与），缺省为 false
 *
 * ```ts
 * interface ParamDataType  {
 *        text: string;
 *        // 用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
 *        tip?: string | number | never | Boolean | null | undefined | any[] ;
 *        //  类型，仅支持文本（text）和密码（password），缺省为文本
 *        type?: "text" | "password";
 *        //   隐私模式
 *       private: false;
 *        //  结果展示
 *       resultText: string;
 *        //  错误展示
 *       errorText: string;
 *       //  是否必填（用户使用配置退出不保证返回值不为 undefined）
 *       required?: boolean;
 *       // 默认值，当可选时且用户未输入返值为此值
 *       defaultValue?: boolean;
 *       // 默认屏蔽了用户使用 `ctrl + c` 组合键退出，但可配置为允许。此时，返回值为 undefined
 *       canCtrlCExit?: boolean;
 *       // 默认屏蔽了用户使用 `ctrl + d` 组合键退出，但可配置为允许。此时，返回值为 undefined
 *       canCtrlDExit?: boolean;
 *       // 设定长度强制限定，优先级高于 `minLen`、`maxLen` 而低于 `verify`
 *       len?: number;
 *       // 设定最小字符数，优先级仅高于  `maxLen`
 *       minLen?: number;
 *       // 设定最长字符数，优先级最低，通过该值将触发返回
 *       maxLen?: number;
 *       // 正则校验
 *       verify?: {
 *         // 正则
 *         reg: RegExp;
 *         // 未通过时提示信息
 *         info: string
 *         // 取反
 *         inverse?: boolean;
 *         // 仅作提示，不作为最后的提交强验证
 *         warn?: boolean
 *       }[]
 *  }
 * ```
 * @example
 * ```ts
 * import { question } from 'a-command';
 *
 * // 最小配置
 * await question('吃了么')
 *
 * // 多问默认
 * await question(['姓名', '性别' ,'年龄']);
 *
 * // 全配置模式
 * await question({
 *    text: '请输入您最爱吃的一种食物',
 *    tip : '只能输入吃的呦',
 *    required: true, // 该项必须输入（当 `len`、`minLen` 大于 0 时将同样限制字符数）
 *    type: 'text',  // 文本输入默认，另可选 `password`
 *    private: true, // 不打印默认结果行
 *    errorText: '您选择了退出，祝您好运', // 用户书用设定退出方式退出
 *    resultText: '原来你喜欢吃', // 结果展示
 *    defaultValue: '西瓜', // 默认值，当有值时，且值混乱时可能不可用
 *    canCtrlCExit: true, // 允许用于使用 `Ctrl + C` 退出
 *    canCtrlDExit: true, // 允许用于使用 `Ctrl + D` 退出
 *    len: 5, // 限制用户输出长度为 5， 该值优先级高于 `minLen`、`maxLen`，却低于 `verify` 校验
 *    minLen: 5, // 限制用户输入长度不低于 5，优先级高于 `maxLen`
 *    maxLen: 5, // 限制用户输入长度不超过 5，校验优先级最低
 *    verify: [{
 *       reg: /^[a-z]+$/, // 限制用户输入仅为 `a-z` 小写英文字符
 *       info: '您仅可输入英文小写字符', // 该校验不通过的提示信息
 *    }, {
 *       reg: /^.{5}$/, // 限制字符数为 5
 *       info: '您输入长度仅可为 5'
 *    }]
 * });
 * // 在上面的示例中，触发检验流程为：
 * // required > verify > len > minLen > maxLen
 * ```
 *
 */
export const question = async function <
  T extends QuestionParamData,
  U extends boolean | undefined = undefined,
>(params: T, simpleResult?: U): Promise<QuestionReturn<T, U>> {
  return core(params, simpleResult);
};

/**
 * ## 输入参数
 * @deprecated 该类型将在未来版本中移除，请使用 `QuestionParamData` 代替
 */
export type QuestionParamDataType = QuestionParamData;
/**
 * ## 返回数据类型
 * @deprecated 该类型将在未来版本中移除，请使用 `QuestionReturn` 代替
 */
export type QuestionReturnType<
  T extends QuestionParamData,
  U extends boolean | undefined,
> = QuestionReturn<T, U>;

export type { QuestionParamData, QuestionReturn, QuestionVerify };
