import {
  isBoolean,
  isNull,
  isNumber,
  isString,
  isSymbol,
  isTrue,
  isType,
  isUndefined,
} from 'a-type-of-js';
import {
  SelectionParamData,
  SelectionParamObjectData,
  SelectionUseData,
  ValueExtendsType,
} from './types';

/**  解析 data 值  */
export function parseData<T extends ValueExtendsType>(
  data: SelectionParamData<T>,
): SelectionUseData<T>[] {
  const result: SelectionUseData<T>[] = [];

  for (let i = 0, j = data.length; i < j; i++) {
    const element = data[i];
    if (
      isType<string | number>(element, ele =>
        [isString, isNumber].some(e => e(ele)),
      )
    ) {
      result.push({
        value: element as T,
        label: element,
        checked: false,
        tip: '',
        disable: false,
      });
    } else if (
      isType<SelectionParamObjectData<T>>(
        element,
        v =>
          [isString, isString].some(e => e(v.label)) &&
          [isString, isNumber, isSymbol].some(e => e(v.value)),
      )
    ) {
      let checked = element.checked;
      if (isUndefined(checked) || !isBoolean(checked)) checked = false;

      let tip = element.tip;
      if (isUndefined(tip) || !isString(tip)) tip = '';

      const value = element.value;
      if (isUndefined(value) || isNull(value))
        throw new TypeError(`value 值类型非法`);

      const label = element.label;
      // 25.6.8 去除下面的校验，已在最外层进行了校验
      // if (!isString(label) && !isNumber(label))
      // throw new TypeError('label 值类型非法');
      const disable = isTrue(element.disable);

      result.push({
        checked,
        tip,
        value,
        label,
        disable,
      });
    } else {
      throw new TypeError(
        `${element} 的类型非法（有可能是返回值类型更改后未在解析中兼容）`,
      );
    }
  }

  return result;
}
