import { core } from './core';
import { QuestionParamDataType, QuestionReturnType } from './types';

/**
 *
 *
 * ```
 * 一个向提问的并收集用户答录
 * ```ts
 *
 * type ParamDataType = {
 *        text: string;
 *        // 用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
 *        tip?: string | number | never | Boolean | null | undefined | any[] ;
 *        //  类型，仅支持文本（text）和密码（password），缺省为文本
 *        type?: "text" | "password";
 *        //   隐私模式
 *       private: false;
 *        //  结果展示
 *       resultText: string;
 *       //  是否必填（用户使用配置退出不保证返回值不为 undefined）
 *       required?: boolean;
 *       // 默认值，当可选时且用户未输入返值为此值
 *       defaultValue?: boolean;
 *       // 默认屏蔽了用户使用 `ctrl + c` 组合键退出，但可配置为允许。此时，返回值为 undefined
 *       canCtrlCExit?: boolean;
 *       // 默认屏蔽了用户使用 `ctrl + d` 组合键退出，但可配置为允许。此时，返回值为 undefined
 *       canCtrlDExit?: boolean;
 *  }
 *
 * ```
 * @param data     参数，可以是 string、ParamDataType 或是他们组成的数组
 * @param  simpleResult   是否显示为简单模式的返回（默认返回是答案与），缺省为 false
 * @example
 *
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
 * await question
 * ```
 */
export const question = async function <
  T extends QuestionParamDataType,
  U extends boolean | undefined = undefined,
>(params: T, simpleResult?: U): Promise<QuestionReturnType<T, U>> {
  return core(params, simpleResult);
};

export type { QuestionParamDataType, QuestionReturnType };
