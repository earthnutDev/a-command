import { _p, cursorShow, readInput } from 'a-node-tools';
import draw from './draw';
import { selectionData } from './selectionData';
import pen, { t } from 'color-pen';
/**
 *
 * 用户选择
 *
 *
 */
export default async function () {
  const { resultText, info, data } = selectionData,
    len = data.length;
  await readInput((keyValue: string | undefined, key: unknown) => {
    const { select } = selectionData;
    switch ((key as { name: string }).name) {
      case 'return':
        cursorShow();
        /**
         *  1A 负责向上衣东一个空格位
         *
         *  J 负责清理光标后的屏幕内容
         */
        _p(`${t}1A${t}J`, false);
        if (!selectionData.private) {
          _p(
            `👌 ${resultText || info}: ${pen.random((data as string[])[select])}`,
          );
        }
        return true;
      case 'up':
        // 用户触发 UP 键，更新当前的 select，重新绘制
        selectionData.select = select == 0 ? len - 1 : select - 1;
        draw();
        break;
      case 'down':
        // 用户触发 DOWN 键，更新当前的 select，重新绘制
        selectionData.select = select == len - 1 ? 0 : select + 1;
        draw();
        break;
      default:
        // 用户使用了其他键，直接重新绘制
        draw();
        break;
    }
    return false;
  });
}
