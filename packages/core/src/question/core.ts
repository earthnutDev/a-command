import { dog } from '../dog';
import commandData from '../commandData';
import { questionStep } from './actionSteps';
import { QuestionParamDataType } from './types';
import { isArray } from 'a-type-of-js';
/**  实现  */
export function questionCore(
  params: QuestionParamDataType,
  simpleResult: boolean = false,
): Promise<string> {
  const uniKey = Symbol('question');
  return new Promise((resolve, reject) => {
    /// 注册事件并进行排队
    commandData.on(uniKey, async () => {
      try {
        /// 原始方法进行问询
        const result = await questionStep(params, simpleResult);
        commandData.remove(uniKey);
        resolve(result as string);
      } catch (error) {
        dog.error('执行出现错误', error);
        commandData.remove(uniKey);
        reject((isArray(params) && []) || '');
      }
    });
  });
}
