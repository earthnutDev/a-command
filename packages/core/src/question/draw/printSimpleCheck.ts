import { magentaPen, underlinePen } from 'color-pen';
import { dataStore } from '../data-store';

/**
 *
 * 打印普通的选择模式
 *
 */
export function printSimpleCheck(text: string): string {
  const { currentIssue, enterText } = dataStore;
  return (
    text +
    (currentIssue.tip as string[])
      .map(i =>
        i === enterText[0] ? underlinePen.bold.blink.cyan(i) : magentaPen(i),
      )
      .join('  ')
  );
}
