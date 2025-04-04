import { questionData } from '../questionData';

/**
 *
 * 删除键或回退键
 *
 */
export function delKey() {
  const { enterText, kind } = questionData;
  if (kind === 0 && questionData.indexOfCursor !== 0) {
    enterText.splice(questionData.indexOfCursor - 1, 1);
    questionData.indexOfCursor--;
  }
}
