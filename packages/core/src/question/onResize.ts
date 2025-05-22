import { debounce } from 'a-js-tools';
import { terminalResetStyle } from '@color-pen/static';
import { _p } from 'a-node-tools';
import { draw } from './draw';

/**  当终端发生尺寸变化  */
export const onResize = debounce(() => {
  _p(terminalResetStyle, false); // 重置属性
  draw();
}, 6);
