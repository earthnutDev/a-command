export type CommandData = {
  /**  顺序执行列表  */
  callList: CommandDataItem[];
  /**  注册执行事件  */
  on(uniKey: symbol, callFn: () => void): void;
  /**  移除对应键的执行  */
  remove(uniKey: symbol): boolean;
};

export type CommandDataItem = [symbol, () => void];
