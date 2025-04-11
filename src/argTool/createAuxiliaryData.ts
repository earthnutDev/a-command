/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName createAuxiliaryData.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description   创建一个新的辅助函数，用函数的方式创建数据可以防止数据污染
 *
 *
 ****************************************************************************/
import { ArgsType, OptionNameArray } from './types';
import { AuxiliaryData } from './auxiliaryData';
import { get$arrMap } from './data-store/getArrayMap';
import { get$map } from './data-store/getMap';
import originalArg from './data-store/originalArg';

/** 因为要保持数据的独立性，所以应当是一个函数 */
export function createAuxiliaryData<T extends OptionNameArray>() {
  return new Proxy(new AuxiliaryData(), {
    get(target, p, receive) {
      /** 代理 args 属性的数据 */
      if (p == 'args') {
        const args: ArgsType<T> = JSON.parse(
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
            _receiver,
          ) {
            switch (_p) {
              case '$nomatch':
                return target.values.slice();
            }
            if (_p == '$map') {
              return get$map<T>(args);
            }
            if (_p == '$arrMap') {
              return get$arrMap<T>(args);
            }
            if (_p == '$only') {
              return [...new Set(args.map(currentEle => currentEle.name))];
            }
            if (_p == '$original') {
              return originalArg.slice();
            }
            if (_p == '$isVoid') {
              return originalArg.slice().length == 0;
            }
            // return 'hello world';
            return Reflect.get(_target, _p, _receiver);
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
}
