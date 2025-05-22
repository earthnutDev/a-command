/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName computeCodeCount.ts
 *  @CreateDate  周三  05/21/2025
 *  @Description
 *
 * 当前使用的是虚拟浮标（光标），不再需要计算该值
 ****************************************************************************/

import { strInTerminalLength } from 'color-pen';
import { QuestionDataType } from './types';

/**
 *
 * 计算位移字符数
 *
 *
 */
export function computeCodeCount(this: QuestionDataType) {
  // 数组的 map 和  filter 会遍历两遍数组
  return this.enterText.reduce(
    (currentValue: number, currentElement: string, currentIndex: number) => {
      // 计算单字符占列数
      if (currentIndex >= this.indexOfCursor)
        currentValue += strInTerminalLength(currentElement);
      return currentValue;
    },
    0,
  );
}
