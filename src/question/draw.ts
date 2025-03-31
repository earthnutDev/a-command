import { cursorMoveLeft, _p } from 'a-node-tools';
import questionData from './questionData';
import pen, { t } from 'color-pen';

const { stdout } = process;

/** draw
 *
 *  绘制
 * */
export default () => {
  /** Terminal display column count
   *
   * 终端屏的显示列数
   */
  const screenWidth = stdout.columns;
  ///  向左移动的光标
  const transformLength = screenWidth ? `${t}${screenWidth}D` : `${t}123D`;
  const { type, currentIssue, userInput, cursorTranslate } = questionData;
  /** Display head
   *
   * 显示头
   */
  _p(`${t}2K${transformLength}${pen.green('?')} ${currentIssue.text}: `, false);
  // 打印选择模式
  if (type != 0) {
    _p(
      (currentIssue.tip as string[])
        .map(i =>
          i == userInput[0]
            ? t.concat('25;1;4;5m').concat(pen.cyan(i))
            : pen.magenta(i),
        )
        .join('  '),
      false,
    );
  } else if (userInput.length == 0 && currentIssue.tip) {
    const transformLength = (currentIssue.tip as string)
      .split('')
      .reduce(
        (currentLen, currentEle) =>
          currentLen + ((currentEle.codePointAt(0) as number) > 0xfff ? 2 : 1),
        0,
      );
    // 打印含提示且用户为输入时文本
    _p(' '.concat(pen.green(currentIssue.tip as string)), false);
    cursorMoveLeft(transformLength);
  } else {
    if (currentIssue.type == 'text') {
      // 打印不还提示的普通文本
      _p(` ${userInput.join('')}`, false);
    } else {
      // 打印密码模式
      _p(` ${userInput.map(() => '*').join('')}`, false);
    }
    if (cursorTranslate !== 0) {
      cursorMoveLeft(cursorTranslate);
    }
  }
};
