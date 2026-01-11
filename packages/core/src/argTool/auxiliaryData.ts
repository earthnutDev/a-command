/**
 * @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @packageDocumentation
 * @module  a-command
 * @file auxiliaryData.ts
 * @since 04/09/2025
 * @description 原始的数据仓库
 * @lastModified 2026-01-10 09:55
 * 包含原始数据、分析的数据及辅助数据、绑定数据
 *
 */
import { isNumber } from 'a-type-of-js';
import { ArgOriginBind, OverCode, StateType } from './bind/types';
import { originalArg } from './data-store/originalArg';
import {
  ArgsType,
  type ArgsArrMap,
  type ArgsGeneralItemParadigm,
  type ArgsMap,
} from './types';

/** 包含原始数据、分析的数据及辅助数据、绑定数据 */
export class AuxiliaryData {
  /**  用户输入命令的原始参数  */
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

/** 仅作初始化用，其实这里直接返回不得了 */
class TempArgs extends Array {
  /**  未匹配的项，是直接输入的项与第一个匹配的首项之前的用户输入的参数数据  */
  get $nomatch(): string[] {
    return [];
  }

  /**  按普通对象的形式返回数据，数据进行了处理，同名的主参数将进行合并  */
  get $map(): ArgsMap {
    return {};
  }

  /** 数组类型的 map ，主要用于有序的执行   */
  get $arrMap(): ArgsArrMap<ArgsGeneralItemParadigm> {
    return [];
  }
  /**  返回仅包含的主头  */
  get $only(): string[] | [] {
    return [];
  }
  /**  原始的用户参数  */
  get $original(): string[] | [] {
    return [];
  }

  /**  用户是否未输入参数  */
  get $isVoid(): boolean {
    return false;
  }
}

/** 定义数据中心 */
export const auxiliaryDataStore: { [key: symbol]: AuxiliaryData } = {};
