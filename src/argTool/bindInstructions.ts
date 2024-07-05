import { typeOf } from 'ismi-js-tools';
import {
  BindParamsOptionsType,
  BindParamsType,
  ParamType,
  SubOptionsType,
} from './types';
import { AuxiliaryData } from './auxiliaryData';

/**  Binding options, descriptions, and abbreviation
 *
 * 绑定选项、说明及缩写
 *
 * @param data {@link BindParamsType}   Binding Command Line Parameter
 *
 *        data {@link BindParamsType}  绑定命令行参数
 */

export default function bindInstruction(
  data: BindParamsType,
  auxiliaryData: AuxiliaryData,
) {
  ///  检测当前
  switch (auxiliaryData.state.code) {
    case 3:
      process.stdout.write('已经执行过 `run`\n');
      return;
    case 4:
      process.stdout.write('已完成全部\n');
      return;
    default:
      auxiliaryData.state = 2;
  }
  let _d: ParamType = {
    name: '',
    info: '',
    abbr: '',
    options: [],
  };
  /**  If a string is used to specify
   *
   * 倘若使用字符串指定  */
  if (typeof data == 'string') {
    const [name, abbr, info] = parsingDataOfString(data);
    return bindInstruction({ name, abbr, info }, auxiliaryData);
  } else if (Array.isArray(data)) {
    /** If the input parameter is an array
     *
     *   倘若为传入参数为数组
     */
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
            // @ts-expect-error 在上一个 if 中已做了处理
            options: data[currentEle],
          },
          auxiliaryData,
        );
      }
    });
  }
  _d = data as ParamType;
  /** Configure abbreviations for easy retrieval
   *
   * 配置缩写，方便检索
   */
  Boolean(_d.abbr) && (auxiliaryData.abbr[_d.abbr as string] = _d.name);

  /** If there are sub items
   *
   *  倘若有子项 \
   * 这里对 _d.options 做了数组判定
   */
  if (_d.options) {
    // @ts-expect-error 这里无需处理
    _d.options = parsingSubOption(_d.options, _d.name, auxiliaryData);
  }
  // @ts-expect-error 这里无需处理
  auxiliaryData.originalBind[_d.name] = { ..._d };
}

/** Parse sub items
 *
 * 解析子项
 *
 *
 * ```ts
 * type BindParamsOptionsType = string | SubOptionsType
 *                              | (string | SubOptionsType)[];
 *
 * type AuxiliaryData
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
  if (typeOf(data) !== 'array') {
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
    if (typeof currentEle == 'string') {
      [_d.name, _d.abbr, _d.info] = parsingDataOfString(currentEle);
    } else {
      // 直接将值进行转化
      _d = Object.assign(_d, currentEle);
    }
    _d.abbr && (auxiliaryData.abbr[`${name}^${_d.abbr}`] = _d.name);
    temporaryObject[_d.name] = _d;
  });
  return temporaryObject;
}

/** Parse when binding data to string type
 *
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
