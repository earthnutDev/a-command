import { questionData } from './questionData';

/**
 *
 * 计算位移字符数
 */
export default function computeCodeCount() {
  // 数组的 map 和  filter 会遍历两遍数组
  return questionData.userInput.reduce(
    (currentValue: number, currentElement: string, currentIndex: number) => {
      // 计算单字符占列数
      if (currentIndex >= questionData.indexOfCursor)
        currentValue +=
          (currentElement.codePointAt(0) as number) > 0x0ff ? 2 : 1;
      return currentValue;
    },
    0,
  );
}
