import { truncateStringWithChar } from 'color-pen';
import { ellipsis } from './ellipsis';
import { dataStore } from '../../data-store';

/**
 *
 *
 *
 */
export function endOfLineAndExtraLong(
  text: string,
  remainingUsableLength: number,
): string {
  const { enterText } = dataStore;
  // 超长在行首末反着就计算应截断长度
  text += ellipsis.concat(
    [
      ...truncateStringWithChar(
        enterText.toReversed().join(''),
        remainingUsableLength - 3,
      ),
    ]
      .reverse()
      .join(''),
  );
  return text;
}
