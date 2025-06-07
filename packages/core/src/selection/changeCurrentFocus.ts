import { selectionData } from './data-store';

/**  更改当前的选择项  */
export function changeCurrentFocus(down: boolean = true) {
  const { focus, drawData } = selectionData;
  const len = drawData.length - 1;
  const list = down
    ? focus === len
      ? drawData
      : [...drawData.slice(focus + 1), ...drawData.slice(0, focus + 1)]
    : focus === 0
      ? drawData.toReversed()
      : [...drawData.slice(focus), ...drawData.slice(0, focus)].toReversed();

  for (const i of list) {
    if (!i.disable) {
      selectionData.focus = i.index;
      return;
    }
  }
}
