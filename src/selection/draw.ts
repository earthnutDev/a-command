import { t, Color, cursorMoveUp, _p } from 'a-node-tools';
import selectionData from './selectionData';
import setColumns from './setColumn';

/** draw
 *
 *  绘制  */
export default function () {
  const len = selectionData.data.length, // Get the number of options  // 获取选项长度
    { info, select, drawData, showPreview, preview } = selectionData;
  // 绘制数据截断
  setColumns();
  _p(
    `${t}1K${t}J${t}w${t}${(info as string).length + 6}D${Color.green('? ')}${info}\n`,
  );
  // 遍历需要绘制的每一行
  for (let i = 0; i < len; i++) {
    // 移动光标的位置到 8 位
    _p(`${t}7h`, false);
    if (i == select) {
      const color = ((i + 5) % 6) + 1;
      _p(
        `  ${t}6;5;3${color}m>${t}m   ${drawData[i]}${t}m     ${t}5;3${color}m<${t}m`,
      );
    } else {
      const color = ((i + 1) % 6) + 1;
      _p(`      ${t}3${color}m${drawData[i]}${t}m`);
    }
  }
  // 是否展示结果
  if (showPreview) {
    _p(`\n${preview} ${drawData[select]}`, false);
  }
  cursorMoveUp(len + 2 + Number(showPreview) * 2);
}
