import { questionData } from '../questionData';

/**
 *
 * 其他键
 *
 */
export function otherKey(keyValue: string | undefined) {
  const { enterText, kind } = questionData;

  if (keyValue != undefined && kind === 0) {
    if (questionData.indexOfCursor == enterText.length) {
      enterText.push(keyValue);
    } else {
      enterText.splice(questionData.indexOfCursor, 0, keyValue);
    }
    questionData.indexOfCursor += 1;
  }
}
