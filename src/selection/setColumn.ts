import { selectionData } from './selectionData';

const { stdout } = process;

/**
 *
 * 选项截断
 *
 */
export default function setColumns() {
  const len = selectionData.data.length,
    { data, drawData } = selectionData;
  const screenLength = stdout.columns;
  for (let i = 0; i < len; i++) {
    const element = data[i];
    let pushData: string | number = 0;
    if (typeof element == 'string') {
      pushData =
        element.length > screenLength
          ? element.slice(0, screenLength)
          : (data[i] as string);
    } else if (typeof element == 'number') {
      pushData = element % 1000000000000000;
    }
    (drawData as (string | number)[]).push(pushData);
  }
}
