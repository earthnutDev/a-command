import { isEmptyArray } from 'a-type-of-js';
import { dog } from './dog';

type CommandData = {
  /**  顺序执行列表  */
  callList: CommandDataItem[];
  /**  注册执行事件  */
  on(uniKey: symbol, callFn: () => void): void;
  /**  移除对应键的执行  */
  remove(uniKey: symbol): boolean;
};

type CommandDataItem = [symbol, () => void];

/**
 *
 * ## 一个简单的管理数据中心
 *
 * 使用 on 将数据添加到 callList 上
 *
 * 使用 remove 进行移除 callList 的第一个元素
 *
 */
const commandData: CommandData = {
  callList: [],
  /**
   * 注册事件
   * @param uniKey
   * @param callFn
   */
  on(uniKey: symbol, callFn: () => void) {
    const list: CommandDataItem[] = this.callList;
    if (isEmptyArray(list)) {
      dog('当前执行列表为空，直接执行任务', uniKey);
      Reflect.apply(callFn, undefined, []); // 待执行列表为空，则直接执行
    }
    list.push([uniKey, callFn]);
  },
  /**
   *
   * 移除上一个事件
   *
   * 返回值仅代表当前是否结束
   *
   * @param uniKey
   */
  remove(uniKey: symbol) {
    //
    const list: CommandDataItem[] = this.callList;
    const uniItem = list.findIndex(([key]) => key === uniKey);
    list.splice(uniItem, 1);

    if (isEmptyArray(list)) {
      dog('当前执行列表为空，返回 true 结束执行');
      return true;
    } else {
      Reflect.apply(list[0][1], null, []);
      return false;
    }
  },
};

export { commandData };
