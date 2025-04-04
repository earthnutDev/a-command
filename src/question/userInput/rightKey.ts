import { questionData } from '../questionData';

/**
 *
 * 键盘中右键触发
 *
 */
export function fightKey(arr: string[], _index: number, len: number) {
  const { kind, enterText } = questionData;
  if (kind === 0) {
    questionData.indexOfCursor =
      questionData.indexOfCursor == questionData.enterText.length
        ? 0
        : questionData.indexOfCursor + 1;
  } else {
    enterText[0] = arr[_index == len ? 0 : _index + 1];
  }
}
