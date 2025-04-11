import { ManageDataType } from './types';

/**
 *
 *
 * 当值被认定为参数的值
 *
 *
 */
export function dataIsValue(
  value: string | boolean | number,
  manageData: ManageDataType,
) {
  // value 值进行整理
  if (value == 'true') {
    value = true;
  } else if (value == 'false') {
    value = false;
  } else if (value == Number(value)) {
    value = Number(value);
  }
  if (manageData.name === '') {
    // 之前这里直接 return，导致最顶层没有 values
    manageData.values.push(value);
  } else {
    //   当下一定有值，判断当下是否有子项
    (
      manageData[manageData.item.name ? 'item' : 'object'].value as (
        | string
        | boolean
        | number
      )[]
    ).push(value);
  }
}
