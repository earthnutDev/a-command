import { questionData } from '../questionData';

/**
 *
 * 左键
 *
 */
export function leftKey(arr: string[], _index: number, len: number) {
  const { kind, enterText } = questionData;
  // 普通输入模式
  if (kind === 0) {
    questionData.indexOfCursor =
      questionData.indexOfCursor == 0
        ? enterText.length
        : questionData.indexOfCursor - 1;
  } else {
    // 选择模式切换当前的输入值
    enterText[0] = arr[_index == 0 ? len : _index - 1];
  }
}
