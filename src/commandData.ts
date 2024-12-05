/**
 *
 *  一个简单的管理数据中心
 *
 * 使用 on 将数据添加到 callList 上
 *
 * 使用 remove 进行移除 callList 的第一个元素
 *
 */
export default {
  callList: [],
  /** 注册事件 */
  on(uniKey: symbol, callFn: () => void) {
    const list: CommandDataItem[] = this.callList;
    list.length == 0 && Reflect.apply(callFn, undefined, []);
    list.push([uniKey, callFn]);
  },
  /** 移除上一个事件
   *
   * 返回值仅代表当前是否结束
   */
  remove() {
    const list: CommandDataItem[] = this.callList;
    list.shift();
    return !(
      (list[0] && (Reflect.apply(list[0][1], undefined, []), true)) ||
      false
    );
  },
};

export type CommandDataItem = [symbol, () => void];
