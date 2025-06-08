import { selectionData } from '../data-store';

/**  反向全选  */
export function reverseSelectAll() {
  selectionData.data.forEach(e => {
    if (!e.disable) {
      e.checked = !e.checked;
    }
  });
  selectionData.drawData.forEach(e => {
    if (!e.disable) {
      e.checked = !e.checked;
    }
  });
}
