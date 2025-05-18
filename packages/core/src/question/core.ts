import { dog } from '../dog';
import commandData from '../commandData';
import { actionStep } from './actionSteps';
import { QuestionParamDataType, QuestionReturnType } from './types';
import { isArray } from 'a-type-of-js';
/**  实现  */
export function core<
  T extends QuestionParamDataType,
  U extends boolean | undefined,
>(params: T, simpleResult: U): Promise<QuestionReturnType<T, U>> {
  const uniKey = Symbol('question');
  return new Promise((resolve, reject) => {
    /// 注册事件并进行排队
    commandData.on(uniKey, async () => {
      try {
        /// 原始方法进行问询
        const result = await actionStep(params, simpleResult);
        commandData.remove(uniKey);
        resolve(result);
      } catch (error) {
        dog.error('执行出现错误', error);
        commandData.remove(uniKey);
        reject((isArray(params) && []) || '');
      }
    });
  });
}
