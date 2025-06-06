import { dog } from '../dog';
import commandData from '../commandData';
import {
  SelectionParamDataType,
  SelectionResultType,
  stringOrNumber,
  ValueExtendsType,
} from './types';
import { selectionStep } from './actionSteps';

/**
 * 选择的核心逻辑，通过 commandData 来管理数据及执行的顺序
 */
export async function core<
  R extends ValueExtendsType = stringOrNumber,
  T extends SelectionParamDataType = SelectionParamDataType,
  U extends 'string' | 'number' | undefined = undefined,
>(data: T, resultType?: U): Promise<SelectionResultType<R, T, U>> {
  const uniKey = Symbol('selection');
  /**
   * 返回一个 promise
   */
  return new Promise((resolve, reject) => {
    /**
     * 注册数据到数据仓中，保证每一个注册的 selection 数据都是独立的
     */
    commandData.on(uniKey, async () => {
      try {
        /**
         * 使用原始定义的 selection 方法执行并返回结果
         */
        const result = (await selectionStep<T, U>(
          data,
          resultType,
        )) as SelectionResultType<R, T, U>;

        commandData.remove(uniKey); // 执行下一个 selection
        resolve(result);
      } catch (error) {
        dog.error(error);
        commandData.remove(uniKey); // 执行下一个 selection
        reject();
      }
    });
  });
}
