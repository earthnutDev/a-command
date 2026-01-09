import { _p, readInput } from 'a-node-tools';

import { dog } from '../../utils/dog';
import { QuestionDataType } from '../types';

import { userInputCn } from './userInputCn';

/**
 *
 * 监听用户键盘输入并处理
 *
 */
export async function userInput(this: QuestionDataType) {
  /**  等待用户输入  */
  try {
    await readInput(userInputCn(this));
  } catch (error) {
    dog.error('接收用户输入出错', error);
    _p(error);
  }
}
