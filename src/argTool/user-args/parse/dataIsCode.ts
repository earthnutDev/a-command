import { addResultItem } from './addResultItem';
import { ManageDataType } from './types';

/**
 *
 *
 * 当值为选择选项
 *
 *
 */
export function dataIsCode(name: string, manageData: ManageDataType) {
  // 倘若上一个项存在,则将上一个项添加到结果中
  if (manageData.name !== '') {
    addResultItem(manageData);
    manageData.resetItem('');
  }
  // 设置新的项值
  manageData.resetObject(name);
}
