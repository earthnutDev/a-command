import {
  isBoolean,
  isNull,
  isNumber,
  isString,
  isSymbol,
  isType,
  isUndefined,
} from 'a-type-of-js';
import {
  SelectionParamData,
  SelectionParamObjectData,
  SelectionUseData,
} from './types';

/**  解析 data 值  */
export function parseData(data: SelectionParamData): SelectionUseData[] {
  const result: SelectionUseData[] = [];

  for (let i = 0, j = data.length; i < j; i++) {
    const element = data[i];
    if (isString(element) || isNumber(element)) {
      result.push({
        value: element,
        label: element,
        checked: false,
        tip: '',
      });
    } else if (
      isType<SelectionParamObjectData>(
        element,
        v =>
          isString(v.label) ||
          (isNumber(v.label) &&
            (isString(v.value) || isNumber(v.value) || isSymbol(v.value))),
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
      if (!isString(label) && !isNumber(label))
        throw new TypeError('label 值类型非法');

      result.push({
        checked,
        tip,
        value,
        label,
      });
    } else {
      throw new TypeError(
        `${element} 的类型非法（有可能是返回值类型更改后未在解析中兼容）`,
      );
    }
  }

  return result;
}
