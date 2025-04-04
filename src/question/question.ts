import commandData from 'src/commandData';
import origin_question from './originQuestion';
import { QuestionParamDataType } from './types';
import { isArray } from 'a-type-of-js';

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
 *  }
 *
 * ```
 * @param data     参数，可以是 string、ParamDataType 或是他们组成的数组
 * @param  simpleResult   是否显示为简单模式的返回（默认返回是答案与），缺省为 false
 *
 */
export default function question(
  params: QuestionParamDataType,
  simpleResult: boolean = false,
): Promise<string> {
  return new Promise((resolve, reject) => {
    /// 注册事件并进行排队
    commandData.on(Symbol('question'), () => {
      try {
        /// 原始方法进行问询
        origin_question(params, simpleResult)
          .then(result => {
            commandData.remove();
            resolve(result as string);
          })
          .catch(() => {
            commandData.remove();
            reject((isArray(params) && []) || '');
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        commandData.remove();
        reject((isArray(params) && []) || '');
      }
    });
  });
}
