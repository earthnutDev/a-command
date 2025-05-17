import { ManageDataType } from './types';

/**
 * 将匹配追加到数据
 *
 * 当出现新的匹配的时候
 *
 * 就会出现追加值的情况
 *
 */
export function addResultItem(manageData: ManageDataType) {
  /** 拿到数据 */
  const { name, object, item, result } = manageData;
  /** 数据为空 */
  if (name === '') {
    /**
     *  之前当当前匹配值为空时直接返回
     *
     * 可能会导致那些没有匹配数的值没有值
     */
    return;
  }

  if (item.name) {
    object.options?.push(item);
  }
  // 将数据推进结果
  result.push(JSON.parse(JSON.stringify(object)));
}
