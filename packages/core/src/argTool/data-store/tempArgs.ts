import { ArgsArrMapType, ArgsMapType, OptionNameArray } from '../types';

/** 仅作初始化用，其实这里直接返回不得了 */
export class TempArgs extends Array {
  /**  未匹配的项，是直接输入的项与第一个匹配的首项之前的用户输入的参数数据  */
  get $nomatch(): string[] {
    return [];
  }

  /**  按普通对象的形式返回数据，数据进行了处理，同名的主参数将进行合并  */
  get $map(): ArgsMapType {
    return {};
  }

  /** 数组类型的 map ，主要用于有序的执行   */
  get $arrMap(): ArgsArrMapType<OptionNameArray> {
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
