import { dog } from '../dog';
import {
  _p,
  cursorLineClear,
  cursorPositionUndo,
  readInput,
} from 'a-node-tools';
import { draw } from './draw';
import { selectionData } from './data-store';
import { redPen } from 'color-pen';

/**
 *
 * 用户选择
 *
 *
 */
export async function userInteraction() {
  const { data, required, kind, drawData } = selectionData,
    len = data.length;
  const result = await readInput(
    (keyValue: string | undefined, key: unknown) => {
      const { focus } = selectionData;
      switch ((key as { name: string }).name) {
        case 'return':
          dog('用户已选择，返回真值告诉等待程序可终结当前输入');
          if (
            kind === 'check' &&
            required &&
            drawData.filter(e => e.checked).length === 0
          ) {
            _p(
              redPen(
                '抱歉，该项至少选择一项！！！请使用空格键或是左右键切换选择状态',
              ),
            );
            draw();
            return false;
          }
          return true;
        case 'up':
          dog('用户使用了键盘键的 up 键');
          // 用户触发 UP 键，更新当前的 select，重新绘制
          selectionData.focus = focus == 0 ? len - 1 : focus - 1;
          draw();
          break;
        case 'down':
          dog('用户使用了键盘键的 down 键');
          // 用户触发 DOWN 键，更新当前的 select，重新绘制
          selectionData.focus = focus == len - 1 ? 0 : focus + 1;
          draw();
          break;

        case 'right':
          dog('用户使用了键盘键的右键');
          if (kind === 'check') {
            drawData[focus].checked = !drawData[focus].checked;
          }
          draw();
          break;
        case 'left':
          dog('用户使用了键盘键的左键');
          if (kind === 'check') {
            drawData[focus].checked = !drawData[focus].checked;
          }
          draw();
          break;
        case 'space':
          dog('用户使用了键盘键的空格键');
          if (kind === 'check') {
            drawData[focus].checked = !drawData[focus].checked;
          }
          draw();
          break;
        default:
          dog('用户使用了键盘键的非方向键 <', keyValue, '>, <', key, '>');
          // 用户使用了其他键，直接重新绘制
          setTimeout(() => draw());
          break;
      }
      return false;
    },
  );

  if (result.isSIGINT && required) {
    cursorPositionUndo();
    cursorLineClear(true);
    _p(redPen('抱歉，该项禁止跳过！！！'));
    return await userInteraction();
  }

  return result;
}
