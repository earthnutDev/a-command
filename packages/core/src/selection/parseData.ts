import { isNumber, isString } from 'a-type-of-js';
import { SelectionParamData, SelectionUseData } from './types';

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
    } else {
      result.push({
        label: element.value,
        checked: false,
        tip: '',
        ...element,
      });
    }
  }

  return result;
}
