import {
  ArgsArrMapItemType,
  ArgsArrMapOptions,
  ArgsArrMapType,
  ArgsItem,
  ArgsItemOptionsType,
  ArgsMapItemType,
  ArgsMapType,
  ArgsType,
} from './argTool/types';

export type CommandData = {
  /**  顺序执行列表  */
  callList: CommandDataItem[];
  /**  注册执行事件  */
  on(uniKey: symbol, callFn: () => void): void;
  /**  移除对应键的执行  */
  remove(uniKey: symbol): boolean;
};

export type CommandDataItem = [symbol, () => void];

export interface PrintOption {
  /**  颜色  */
  color: string;
  /**   前缀  */
  prefix: string;
}

/**  打印消息使用参数  */
export type CommandPrintOption = {
  [x in keyof PrintOption]?: PrintOption[x];
};

export type {
  ArgsItemOptionsType,
  ArgsItem,
  ArgsMapType,
  ArgsMapItemType,
  ArgsArrMapType,
  ArgsArrMapItemType,
  ArgsArrMapOptions,
  ArgsType,
};
