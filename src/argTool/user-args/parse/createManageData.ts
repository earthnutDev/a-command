import { ManageDataType } from './types';

/**
 *
 * 创建管理数据
 *
 */
export function createManageDate(): ManageDataType {
  /** 整理数据用到的数据 */
  const manageData: ManageDataType = {
    /**  最终的结果，是由有固定格式的元素组成的数组 */
    result: [],
    /** 临时储存值 */
    values: [],
    /** 当前的匹配参数值 */
    name: '',
    /** 匹配的值 */
    object: { name: '', value: [], options: [] },
    /** 匹配出来的子项的元素值 */
    item: { name: '', value: [] },
    resetObject(name) {
      this.name = name;
      this.object = { name, value: [], options: [] };
    },
    /**
     * 重置
     */
    resetItem(name: string) {
      this.item = { name, value: [] };
    },

    /** 初始化数据 */
    init() {
      this.result = [];
      this.values = [];
      this.resetItem('');
      this.resetObject('');
    },
  };
  return manageData;
}
