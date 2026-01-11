/**
 * @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @packageDocumentation
 * @module  a-command
 * @file getArrayMap.ts
 * @since 04/09/2025
 * @description 在针对需要顺序执行的时候，使用 `$arrMap` 数据要方便些
 */

import { isEmptyArray, isUndefined } from 'a-type-of-js';
import {
  ArgsArrMapItem,
  ArgsArrMap,
  ArgsType,
  ArgsGeneralItemParadigm,
} from '../types';

/**
 * 返回一个数组对象，有序的，与本体值类似，每一个元素都可以做会返回值。
 *
 * 主要关注的是有序
 * @param value
 */
export function get$arrMap<T extends ArgsGeneralItemParadigm>(
  value: ArgsType<T>,
): ArgsArrMap<T> {
  if (isEmptyArray(value)) return [];
  return value.map(currentElement => {
    // 临时演员
    const resultValue: { [key in keyof T]?: ArgsArrMapItem<T[keyof T]> } = {};

    const temp =
      (resultValue[currentElement.name] as ArgsArrMapItem<T[keyof T]>) || {};

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
      /** @ts-expect-error: 上面的判读就是为了防止这里出错误  */
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
