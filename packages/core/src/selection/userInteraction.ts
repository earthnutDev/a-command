import { dog } from '../dog';
import { readInput } from 'a-node-tools';
import { draw } from './draw';
import { selectionData } from './data-store';
import { esc } from '@color-pen/static';
import { isTrue } from 'a-type-of-js';

/**
 *
 * 用户选择
 *
 *
 */
export async function userInteraction() {
  const { data, required, kind, drawData, canCtrlCExit, canCtrlDExit } =
      selectionData,
    len = data.length;
  /**  返回值，用户判定用户是否主动退出  */
  const result = {
    exit: false,
  };
  await readInput((keyValue, key) => {
    const { focus } = selectionData;
    switch ((key as { name: string }).name) {
      case 'return':
        dog('用户已选择，返回真值告诉等待程序可终结当前输入');
        if (
          kind === 'check' &&
          required &&
          drawData.filter(e => e.checked).length === 0
        ) {
          selectionData.mustInfo = true;
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
      // eslint-disable-next-line no-fallthrough
      case 'left':
        dog('用户使用了键盘键的左键');
      // eslint-disable-next-line no-fallthrough
      case 'space':
        dog('用户使用了键盘键的空格键');
        if (kind === 'check') {
          drawData[focus].checked = !drawData[focus].checked;
          draw();
        }
        break;
      case 'escape':
        // 是否是 esc 按键双击
        if (key?.sequence === esc.repeat(2)) {
          result.exit = true;
          return true;
        }
        break;
      default:
        dog('用户使用了键盘键的非方向键 <', keyValue, '>, <', key, '>');
        if (
          isTrue(key?.ctrl) &&
          ((isTrue(canCtrlCExit) && key?.name === 'c') ||
            (isTrue(canCtrlDExit) && key?.name === 'd'))
        ) {
          result.exit = true;
          return true;
        }
        break;
    }
    return false;
  });

  return result.exit;
}
