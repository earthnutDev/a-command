import { ManageDataType, ManageDataTypeItem } from './types';

/**
 *
 *  当前值为子项
 *
 */
export function dataIsOption(name: string, manageData: ManageDataType) {
  const { item, object } = manageData;
  // 上一个子项值存在 。因为在 if 中已经做了存在的判断
  if (item.name) (object.options as ManageDataTypeItem[]).push(item);
  manageData.resetItem(name);
}
