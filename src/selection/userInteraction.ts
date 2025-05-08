import { dog } from '../dog';
import {
  _p,
  cursorAfterClear,
  cursorMoveUp,
  cursorShow,
  readInput,
} from 'a-node-tools';
import draw from './draw';
import { selectionData } from './data-store';
import { pen } from 'color-pen';
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
         *  1A 负责向上移动一个空格位
         *
         *  J 负责清理光标后的屏幕内容
         */
        cursorMoveUp();
        cursorAfterClear(true);
        dog('用户已选择，返回真值告诉等待程序可终结当前输入');
        if (!selectionData.private) {
          _p(
            `👌 ${resultText || info}: ${pen.brightCyan((data as string[])[select])}`,
          );
        }
        return true;
      case 'up':
        cursorAfterClear();
        dog('用户使用了键盘键的 up 键');
        // 用户触发 UP 键，更新当前的 select，重新绘制
        selectionData.select = select == 0 ? len - 1 : select - 1;
        draw();
        break;
      case 'down':
        cursorAfterClear();
        dog('用户使用了键盘键的 down 键');
        // 用户触发 DOWN 键，更新当前的 select，重新绘制
        selectionData.select = select == len - 1 ? 0 : select + 1;
        draw();
        break;
      default:
        cursorAfterClear();
        dog('用户使用了键盘键的非方向键');
        // 用户使用了其他键，直接重新绘制
        draw();
        break;
    }
    return false;
  });
}
