import { AuxiliaryData } from '../auxiliaryData';
import { isArray, isString } from 'a-type-of-js';
import { parsingDataOfString } from './parsingDataOfString';
import { BindParamsOptionsType, SubOptionsType } from './types';

/**
 * 解析子项
 *
 * ```ts
 * type BindParamsOptionsType =
 *      | string
 *      | SubOptionsType
 *      | (string | SubOptionsType)[];
 *
 * ```
 *
 */
export function parsingSubOption(
  data: BindParamsOptionsType,
  name: string,
  auxiliaryData: AuxiliaryData,
): {
  [a: string]: { name: string; abbr: string; info: string };
} {
  // 转化非数组
  if (!isArray(data)) {
    data = [data as SubOptionsType | string];
  }
  const temporaryObject: {
    [a: string]: { name: string; abbr: string; info: string };
  } = {};
  // 前面已经把非数组进行了转化为数组
  (data as (string | SubOptionsType)[]).forEach(currentEle => {
    let _d = {
      name: '',
      abbr: '',
      info: '',
    };
    // 如果是简单的字符串，则使用 `parsingDataOfString` 解析为数组
    if (isString(currentEle)) {
      [_d.name, _d.abbr, _d.info] = parsingDataOfString(currentEle);
    } else {
      // 直接将值进行转化
      _d = Object.assign(_d, currentEle);
    }
    if (_d.abbr) {
      auxiliaryData.abbr[`${name}^${_d.abbr}`] = _d.name;
    }
    temporaryObject[_d.name] = _d;
  });
  return temporaryObject;
}
