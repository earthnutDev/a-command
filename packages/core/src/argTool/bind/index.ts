import { dog } from './../../dog';
import { AuxiliaryData } from '../auxiliaryData';
import { BindParamsOptionsType, BindParamsType, ParamType } from './types';
import { isArray, isString } from 'a-type-of-js';
import { parsingDataOfString } from './parsingDataOfString';
import { parsingSubOption } from './parsingSubOption';

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
    case 3: {
      dog.warn('执行绑定', '但是已经执行过 `run`');
      return;
    }
    case 4: {
      dog.warn('执行绑定，但是 command 已完成全部应做动作');
      return;
    }
    // 状态码为 3 以下设置状态码值为 2
    default:
      auxiliaryData.state = 2;
  }
  // 倘若使用字符串那么将字符串解析成对应的数据结构
  if (isString(data)) {
    const [name, abbr, info] = parsingDataOfString(data);
    return bindInstruction({ name, abbr, info }, auxiliaryData);
  }
  //  倘若为传入参数为数组
  else if (isArray(data)) {
    return data.forEach((currentEle: BindParamsType) =>
      bindInstruction(currentEle, auxiliaryData),
    );
  }
  // 不是字符串也不是数组就是对象了
  // 而且是没有 `name` 和 `info`
  // 这是一个怪异的模式，直接解析
  else if (data !== undefined && !data.name && !data.info) {
    return weirdModePreprocessing(data as never, auxiliaryData);
  }

  const _d = data as ParamType;

  //  配置缩写，方便检索
  if (_d.abbr) {
    auxiliaryData.abbr[_d.abbr as string] = _d.name;
  }

  /**
   *  倘若有子项
   *
   *  这里对 _d.options 做了数组判定
   *
   * 虽然 _d 设定上是必有的数组，但是在为字符时是不会有 options 的
   */
  if (_d.options) {
    _d.options = parsingSubOption(_d.options, _d.name, auxiliaryData) as never;
  } else {
    _d.options = {} as BindParamsOptionsType;
  }

  auxiliaryData.originalBind[_d.name] = { abbr: '', ..._d } as never;
}

/**
 *
 *  怪异模式预处理
 *
 */
function weirdModePreprocessing(
  data: {
    [x: string]: BindParamsOptionsType | undefined;
  },
  auxiliaryData: AuxiliaryData,
) {
  /**  解析后得到的数据结构  */
  const _d: ParamType = {
    name: '',
    info: '',
    abbr: '',
    options: [],
  };
  /**
   * 传入被认定为怪异模式
   */
  const keys = Object.keys(data),
    /**  已经绑定的参数  */
    _d_keys = Object.keys(_d);
  return keys.forEach((currentEle: string) => {
    if (!_d_keys.includes(currentEle)) {
      const [name, abbr, info] = parsingDataOfString(currentEle);
      return bindInstruction(
        {
          name,
          info,
          abbr,
          // 这里直接
          options: data[currentEle as never],
        },
        auxiliaryData,
      );
    }
  });
}
