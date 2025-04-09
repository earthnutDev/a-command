/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName auxiliaryDataStore.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 做数据库
 *
 *
 * 按照数据初始化时传入的唯一 key 存储数据并分析数据，防止数据的污染
 *
 ****************************************************************************/
import { AuxiliaryData } from './auxiliaryData';

/** 定义数据中心 */
export const auxiliaryDataStore: { [key: symbol]: AuxiliaryData } = {};
