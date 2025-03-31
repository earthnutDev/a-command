import {
  ArgOriginBind,
  ArgsArrMapType,
  ArgsItem,
  ArgsMapItemType,
  ArgsMapType,
  ArgsType,
  StateType,
} from './types';

/** 原始的用户输入的参数数组 */
const originalArg: string[] = process.argv.slice(2);

/** 定义数据中心 */
export const auxiliaryDataStore: { [key: symbol]: AuxiliaryData } = {};

/** 定义类 */
export class AuxiliaryData {
  originalArg = originalArg.slice();
  /** 命令名称 */
  name: string = '';
  /** 文件目录 */
  __filename: string = '';
  /**
   *  当前状态
   *
   *  - 1 `start`  刚开始，等待绑定
   *  - 2 `bind over`  执行绑定，等待执行
   *  - 3  `run over`  解析完毕
   *  - 4 `over` 执行完毕，不建议在此命令后进行任何操作
   *
   */
  get state(): StateType {
    return this._state;
  }
  /**
   *
   *
   *
   */
  set state(stateCode: 1 | 2 | 3 | 4) {
    this._state = [
      undefined,
      { code: 1, text: 'start' },
      { code: 2, text: 'bind over' },
      { code: 3, text: 'run over' },
      { code: 4, text: 'over', overCode: 'help' },
    ][stateCode] as StateType;
  }

  _state: StateType = { code: 1, text: 'start' };

  /**  启动的选项（处理后的用户输入）*/
  args: ArgsType = new TempArgs();
  /** abbreviate table
   *
   *  缩写表
   */
  abbr: { [key: string]: string } = {};
  /**   帮助文档*/
  helpInfo: string | string[] = '';
  /**  原始参数 */
  originalBind: ArgOriginBind = {};

  /**
   * 未匹配值的数据值
   *
   * 使用 `bind` 绑定之外的数据，即直接作用在
   */
  values: (string | number | boolean)[] = [];
}

/** 仅作初始化用，其实这里直接返回不得了 */
class TempArgs extends Array {
  /**
   *
   *
   *
   */
  get $nomatch(): string[] {
    return [];
  }
  /**
   *
   *
   *
   */
  get $map(): ArgsMapType {
    return {};
  }
  /**
   *
   *
   *
   */
  get $arrMap(): ArgsArrMapType {
    return [];
  }
  /**
   *
   *
   *
   */
  get $only(): string[] | [] {
    return [];
  }
  /**
   *
   *
   *
   */
  get $original(): string[] | [] {
    return [];
  }
  /**
   *
   *
   *
   */
  get $isVoid(): boolean {
    return false;
  }
}

/** 因为要保持数据的独立性，所以应当是一个函数 */
export const createAuxiliaryData = () =>
  new Proxy(new AuxiliaryData(), {
    get(target, p, receive) {
      /** 代理 args 属性的数据 */
      if (p == 'args') {
        const args = JSON.parse(
          // @ts-expect-error 后添加的属性，不好处理，这里就直接 ignore 了，后期有别的办法在进行修改
          JSON.stringify(target[Symbol.for('_args')] || []),
        );
        return new Proxy(args, {
          get(
            _target,
            _p:
              | symbol
              | '$map'
              | '$arrMap'
              | '$only'
              | '$original'
              | '$isVoid'
              | '$nomatch',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _receiver,
          ) {
            switch (_p) {
              case '$nomatch':
                return target.values.slice();
            }
            if (_p == '$map') {
              return get$map(args);
            }
            if (_p == '$arrMap') {
              return get$arrMap(args);
            }
            if (_p == '$only') {
              return args.map(
                (currentEle: { name: string }) => currentEle.name,
              );
            }
            if (_p == '$original') {
              return originalArg.slice();
            }
            if (_p == '$isVoid') {
              return originalArg.slice().length == 0;
            }
            return 'hello world';
          },
          set(_target, _p, _newValue, _receive) {
            Reflect.set(_target, _p, _newValue, _receive);
            return true;
          },
        });
      }
      return Reflect.get(target, p, receive);
    },
    set(target: AuxiliaryData, p, newValue, receiver) {
      if (p == 'args') {
        // @ts-expect-error 后添加的属性，不好处理，这里就直接 ignore 了，后期有别的办法在进行修改
        target[Symbol.for('_args')] = newValue;
      } else Reflect.set(target, p, newValue, receiver);
      return true;
    },
  });

/** 返回 args 的 map 版本 */
function get$map(value: ArgsItem[]): ArgsMapType {
  if (value.length == 0) return {};
  // 结果对象
  const resultValue: ArgsMapType = new Object() as ArgsMapType;
  value.forEach(currentElement => {
    // 临时演员 ，可能是对象上已存在的值或者是新建的空对象
    const _temp: ArgsMapItemType = resultValue[currentElement.name] || [];
    /** 判断是否已经存在同名属性 */
    const valueIsExist: boolean = Object.keys(_temp).length > 0;
    // 判断当前是否有 value 属性，并判断是否有同名属性，有则追加，没有则直接
    if (currentElement.value && currentElement.value.length > 0) {
      _temp.value = valueIsExist
        ? _temp.value.concat(currentElement.value)
        : currentElement.value;
    }
    // 当前元素有子项
    if (currentElement.options) {
      // 每一个子项再遍历（遍历需考虑旧数据问题，即已经存在同名属性 valueIsExist 为 true 情况）
      currentElement.options.forEach(_currentEle => {
        _temp[_currentEle.name] =
          valueIsExist && _temp[_currentEle.name] !== undefined
            ? _temp[_currentEle.name].concat(_currentEle.value)
            : _currentEle.value;
      });
    }
    resultValue[currentElement.name] = _temp;
  });

  return resultValue;
}

/**
 * 返回一个数组对象，有序的，与本体值类似，每一个元素都可以做会返回值。
 *
 * 主要关注的是有序
 */
function get$arrMap(value: ArgsItem[]): ArgsArrMapType {
  if (value.length == 0) return [];
  return value.map(currentElement => {
    // 临时演员
    const resultValue: ArgsMapType = {};
    // 临时演员
    const _temp: { [key: string]: string[] } = (resultValue[
      currentElement.name
    ] = {
      value: [],
    });
    // 判断当前是否有 value 属性
    if (currentElement.value && currentElement.value.length > 0) {
      _temp.value = currentElement.value;
    }
    // 当前元素有子项
    if (currentElement.options && currentElement.options.length > 0) {
      currentElement.options.forEach(_currentEle => {
        _temp[_currentEle.name] = _currentEle.value as string[];
      });
    }
    return resultValue;
  });
}
