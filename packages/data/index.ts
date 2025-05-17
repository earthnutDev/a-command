export type CommandDataItem = {
  /**  唯一键  */
  key: symbol;
  /**  文本  */
  message: string;
  /**  回调  */
  callback: () => void;
};

export type CommandDataOther = {
  /**  其他数据  */
  otherData: Record<string, unknown>;
};

/**
 *
 *  一个简单的管理数据中心
 *
 * 使用 on 将数据添加到 callList 上
 *
 * 使用 remove 进行移除 callList 的第一个元素
 *
 */
class ACommandDataClass<T extends CommandDataItem = CommandDataItem> {
  /**  顺序执行列表  */
  callList: T[] = [];
  /** 注册事件 */
  on(this: ACommandDataClass<T>, uniKey: symbol, callFn: () => void) {
    const list: T[] = this.callList;
    if (list.length == 0) {
      Reflect.apply(callFn, undefined, []); // 待执行列表为空，则直接执行
    }

    list.push({
      key: uniKey,
      message: '',
      callback: callFn,
    });
  }
  /**
   *
   * 移除上一个事件
   *
   * 返回值仅代表当前是否结束
   *
   */
  remove(uniKey: symbol) {
    //
    const list: CommandDataItem[] = this.callList;
    const uniItem = list.findIndex(([key]) => key === uniKey);
    list.splice(uniItem, 1);

    /// 没有执行项
    if (list.length === 0) {
      return true;
    } else {
      Reflect.apply(list[0][1], null, []);
      return false;
    }
  }
}

const commandData = new ACommandDataClass();

export { commandData as aCommandData, ACommandDataClass };
