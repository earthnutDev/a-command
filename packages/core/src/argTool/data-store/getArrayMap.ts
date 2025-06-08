/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName getArrayMap.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 在针对需要顺序执行的时候，使用 `$arrMap` 数据要方便些
 ****************************************************************************/

import { isEmptyArray, isUndefined } from 'a-type-of-js';
import {
  ArgsArrMapItemType,
  ArgsArrMapType,
  ArgsType,
  OptionNameArray,
} from '../types';

/**
 * 返回一个数组对象，有序的，与本体值类似，每一个元素都可以做会返回值。
 *
 * 主要关注的是有序
 */
export function get$arrMap<T extends OptionNameArray>(
  value: ArgsType<T>,
): ArgsArrMapType<T> {
  if (isEmptyArray(value)) return [];
  return value.map(currentElement => {
    // 临时演员
    const resultValue: { [key in keyof T]?: ArgsArrMapItemType<T[keyof T]> } =
      {};

    const temp =
      (resultValue[currentElement.name] as ArgsArrMapItemType<T[keyof T]>) ||
      {};

    // 判断当前是否有 value 属性
    if (currentElement.value && !isEmptyArray(currentElement.value)) {
      temp.value = currentElement.value;
    }
    // 当前元素有子项时
    if (
      !isUndefined(currentElement) &&
      !isUndefined(currentElement.options) &&
      !isEmptyArray(currentElement.options)
    ) {
      temp.options = [];

      // eslint-disable-next-line jsdoc/check-tag-names
      /**  @ts-expect-error: 上面的判读就是为了防止这里出错误  */
      // 遍历子项给当前元素添加子项
      currentElement.options.forEach(_currentEle => {
        temp.options?.push(
          Object.fromEntries([[_currentEle.name, _currentEle.value]]),
        );
      });
    }
    resultValue[currentElement.name] = temp;
    return resultValue;
  });
}
