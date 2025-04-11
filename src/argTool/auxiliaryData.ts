/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName auxiliaryData.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 原始的数据仓库
 *
 * 包含原始数据、分析的数据及辅助数据、绑定数据
 *
 ****************************************************************************/
import { isNumber } from 'a-type-of-js';
import { TempArgs } from './data-store/tempArgs';
import originalArg from './data-store/originalArg';
import { ArgOriginBind, OverCode, StateType } from './bind/types';
import { ArgsType } from './types';

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

  /**   程序运行的当前状态  */
  set state(overCode: 1 | 2 | 3 | OverCode) {
    this._state = [
      undefined,
      { code: 1, text: 'start' },
      { code: 2, text: 'bind over' },
      { code: 3, text: 'run over' },
      { code: 4, text: 'over', overCode },
    ][isNumber(overCode) ? overCode : 4] as StateType;
  }

  _state: StateType = { code: 1, text: 'start' };

  /**
   *
   *  启动的选项（处理后的用户输入）
   *
   *
   *  该数值
   */
  args: ArgsType = new TempArgs();
  /**
   *
   *  缩写表
   */
  abbr: { [key: string]: string } = {};
  /**   帮助文档*/
  helpInfo: string | string[] = '';

  /**  是否显示版本信息 */
  hasShowVersion: boolean = false;

  /**  原始参数 */
  originalBind: ArgOriginBind = {};

  /**
   * 未匹配值的数据值
   *
   * 使用 `bind` 绑定之外的数据，即直接作用在
   */
  values: (string | number | boolean)[] = [];
}

/** 定义数据中心 */
export const auxiliaryDataStore: { [key: symbol]: AuxiliaryData } = {};
