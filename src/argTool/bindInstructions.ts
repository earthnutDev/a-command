import { _p } from 'a-node-tools';
import {
  BindParamsOptionsType,
  BindParamsType,
  ParamType,
  SubOptionsType,
} from './types';
import { AuxiliaryData } from './data-store/auxiliaryData';
import { isArray, isString } from 'a-type-of-js';

/**
 * 绑定选项、说明及缩写
 *
 * @param  data {@link BindParamsType}  绑定命令行参数
 */
export default function bindInstruction(
  data: BindParamsType,
  auxiliaryData: AuxiliaryData,
) {
  ///  检测当前状态码
  switch (auxiliaryData.state.code) {
    // 状态码不正确直接打印消息返回
    case 3:
      _p('已经执行过 `run`');
      return;
    case 4:
      _p('已完成全部');
      return;
    // 状态码为 3 以下设置状态码值为 2
    default:
      auxiliaryData.state = 2;
  }
  /**  解析后得到的数据结构  */
  let _d: ParamType = {
    name: '',
    info: '',
    abbr: '',
    options: [],
  };
  /** 倘若使用字符串指定   */
  if (isString(data)) {
    const [name, abbr, info] = parsingDataOfString(data);
    return bindInstruction({ name, abbr, info }, auxiliaryData);
  } else if (isArray(data)) {
    /**  倘若为传入参数为数组  */
    return data.forEach((currentEle: BindParamsType) =>
      bindInstruction(currentEle, auxiliaryData),
    );
  } else if (!data.name && !data.info) {
    /**
     * 传入被认定为怪异模式
     */
    const keys = Object.keys(data),
      _d_keys = Object.keys(_d);
    return keys.forEach((currentEle: string) => {
      if (!_d_keys.includes(currentEle)) {
        const [name, abbr, info] = parsingDataOfString(currentEle);
        return bindInstruction(
          {
            name,
            info,
            abbr,
            options: data[currentEle as never],
          },
          auxiliaryData,
        );
      }
    });
  }
  _d = data as ParamType;
  /** 配置缩写，方便检索
   *
   *
   */
  if (_d.abbr) {
    auxiliaryData.abbr[_d.abbr as string] = _d.name;
  }

  /**
   *  倘若有子项
   *
   * 这里对 _d.options 做了数组判定
   */
  if (_d.options) {
    _d.options = parsingSubOption(_d.options, _d.name, auxiliaryData) as never;
  }
  auxiliaryData.originalBind[_d.name] = { ..._d } as never;
}

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
function parsingSubOption(
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

/**
 * 解析当绑定数 据为字符串类型
 *
 * @returns 返回是 [string, string, string] ，对应了 [name , abbr , info];
 */
function parsingDataOfString(data: string): [string, string, string] {
  const name = data.replace(/^(.*?)\s.*/gm, '$1') || '';
  const abbr = (/<.+>/.test(data) && data.replace(/.*<(.+)>.*/, '$1')) || '';
  const info = data.replace(/.*?\((.*)\).*?/, '$1') || '';
  return [name, abbr, info];
}
