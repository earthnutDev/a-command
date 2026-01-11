/**
 * @file userInteraction.ts
 * @description 用户的输入交互判定
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @packageDocumentation
 * @module  selection
 * @since 2026-01-10 10:22
 * @lastModified 2026-01-11 16:28
 **/

import { esc } from '@color-pen/static';
import { readInput } from 'a-node-tools';
import { isEmptyArray, isTrue } from 'a-type-of-js';
import { dog } from '../utils/dog';
import { selectionData } from './data-store';
import { draw } from './draw';

/**  用户选择后处理  */
export async function userInteraction() {
  const { data, required, kind, drawData, canCtrlCExit, canCtrlDExit } =
    selectionData;
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
          isEmptyArray(drawData.filter(e => e.checked))
        ) {
          selectionData.mustInfo = true;
          draw();
          return false;
        }
        return true;
      case 'up':
        dog('用户使用了键盘键的 up 键');
        // 用户触发 UP 键，更新当前的 select，重新绘制
        changeCurrentFocus(false);
        draw();
        break;
      case 'down':
        dog('用户使用了键盘键的 down 键');
        // 用户触发 DOWN 键，更新当前的 select，重新绘制
        changeCurrentFocus();
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
          data[focus].checked = drawData[focus].checked =
            !drawData[focus].checked;
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
        if (isTrue(key?.ctrl)) {
          if (selectionData.kind === 'check') {
            if (key?.name === 'a') {
              checkAll();
              draw();
            }
            if (key?.name === 'z') {
              checkAll(false);
              draw();
            }
            if (key?.name === 'r') {
              reverseSelectAll();
              draw();
            }
          }
          // 退出
          if (
            (isTrue(canCtrlCExit) && key?.name === 'c') ||
            (isTrue(canCtrlDExit) && key?.name === 'd')
          ) {
            result.exit = true;
            return true;
          }
        }
        break;
    }
    return false;
  });

  return result.exit;
}

/**
 *  全选或取消全选
 * @param allChecked
 */
function checkAll(allChecked: boolean = true) {
  selectionData.data.forEach(e => {
    if (!e.disable) {
      e.checked = allChecked;
    }
  });
  selectionData.drawData.forEach(e => {
    if (!e.disable) {
      e.checked = allChecked;
    }
  });
}
/**  反向全选  */
function reverseSelectAll() {
  selectionData.data.forEach(e => {
    if (!e.disable) {
      e.checked = !e.checked;
    }
  });
  selectionData.drawData.forEach(e => {
    if (!e.disable) {
      e.checked = !e.checked;
    }
  });
}

/**
 *  更改当前的选择项
 * @param down
 */
export function changeCurrentFocus(down: boolean = true) {
  const { focus, drawData } = selectionData;
  const len = drawData.length - 1;
  const list = down
    ? focus === len
      ? drawData
      : [...drawData.slice(focus + 1), ...drawData.slice(0, focus + 1)]
    : focus === 0
      ? drawData.toReversed()
      : [...drawData.slice(focus), ...drawData.slice(0, focus)].toReversed();

  for (const i of list) {
    if (!i.disable) {
      selectionData.focus = i.index;
      return;
    }
  }
}
