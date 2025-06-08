import { selectionData } from '../data-store';

/**  全选或取消全选  */
export function checkAll(allChecked: boolean = true) {
  selectionData.data.forEach(e => {
    if (!e.disable) {
      e.checked = allChecked;
    }
  });
  selectionData.drawData.forEach(e => {
    if (!e.disable) {
      e.checked = allChecked;
    }
  });
}
