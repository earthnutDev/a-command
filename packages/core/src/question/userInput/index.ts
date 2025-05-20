import { readInput } from 'a-node-tools';

import { QuestionDataType } from '../types';

import { userInputCn } from './userInputCn';
import { dog } from '../../dog';

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
    console.log(error);
  }
}
