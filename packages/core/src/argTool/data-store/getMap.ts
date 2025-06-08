/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName getMap.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 在使用不需要顺序的时候，直接使用 `$map` 数据要方便些
 *
 *  使用  `$map` 数据结构，返回一个对象，对象的键值对为：
 *  - 键名：参数名
 *  - 键值：参数值
 *  - 键值：参数的子项
 *  - - 键值：参数的子项的值
 *  - - 键值：参数的子项的子项
 *
 * 可以直观的通过判断 `$map` 下是否有该参数即可
 ****************************************************************************/

import { isEmptyArray } from 'a-type-of-js';
import {
  ArgsMapItemType,
  ArgsMapType,
  ArgsType,
  OptionNameArray,
} from '../types';

/**
 *
 * 返回 args 的 map 版本
 *
 * @param value  args 的值
 * @returns  args 的 map 版本
 * @description 该返回值仅关注🈶或是🈚️的问题，不关心参数出现的实际顺序，在需求上可能与 $arrMap 不太一致
 *
 *
 */
export function get$map<T extends OptionNameArray>(
  value: ArgsType<T>,
): ArgsMapType<T> {
  if (isEmptyArray(value)) return {};
  // 结果对象
  const resultValue: ArgsMapType = new Object() as ArgsMapType;

  value.forEach(currentElement => {
    // 临时演员 ，可能是对象上已存在的值或者是新建的空对象
    const _temp: ArgsMapItemType = resultValue[currentElement.name] || {};
    /** 判断是否已经存在同名属性 */

    // 判断当前是否有 value 属性，并判断是否有同名属性，有则追加，没有则直接🆓给值
    _temp.value = [...(_temp.value || []), ...(currentElement.value || [])];

    // 当前元素有子项
    if (currentElement.options) {
      // 每一个子项再遍历（遍历需考虑旧数据问题，即已经存在同名属性 valueIsExist 为 true 情况）
      currentElement.options.forEach(currentOptionElement => {
        // eslint-disable-next-line jsdoc/check-tag-names
        /**  @ts-expect-error: 👻 因为是非显示的给值，该值作为值的属性在判定上不一定成立 */
        _temp[currentOptionElement.name] = [
          ...(_temp[currentOptionElement.name as unknown as never] || []),
          ...(currentOptionElement.value || []),
        ];
      });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, jsdoc/check-tag-names
    /**  @ts-ignore: 该值一定存在  */
    resultValue[currentElement.name] = _temp;
  });

  return resultValue;
}
