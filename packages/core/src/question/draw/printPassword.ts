import { bgPen666 } from '../../utils/info';
import { dataStore } from '../data-store';

/**  打印密码模式  */
export function printPassword(text: string): string {
  const { enterText, indexOfCursor } = dataStore;
  if (indexOfCursor === enterText.length) {
    text += ` ${enterText.map(() => '*').join('')}`;

    text += bgPen666.hide('1');
  } else {
    text += ` ${enterText.map((e, i) => (i === indexOfCursor ? bgPen666('*') : '*')).join('')}`;
  }
  return text;
}
