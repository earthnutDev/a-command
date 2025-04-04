import { cursorMoveLeft, _p } from 'a-node-tools';
import pen, { t } from 'color-pen';
import { questionData } from './questionData';

const { stdout } = process;

/**
 *
 *  绘制
 * */
export default () => {
  /**
   *
   * 终端屏的显示列数
   */
  const screenWidth = stdout.columns;
  ///  向左移动的光标
  const transformLength = screenWidth ? `${t}${screenWidth}D` : `${t}123D`;
  const { kind, currentIssue, enterText, cursorTranslate } = questionData;

  /**  清理旧的输入信息并将光标移动到输入最左侧  */
  _p(`${t}2K${transformLength}`, false);
  const requiredStr = currentIssue.required ? pen.blink.brightRed('*') : '';
  // 显示头
  _p(
    `${pen.green('?')} ${requiredStr}${currentIssue.text}${requiredStr}: `,
    false,
  );

  if (kind !== 0) {
    // 打印选择模式
    _p(
      (currentIssue.tip as string[])
        .map(i =>
          i === enterText[0]
            ? pen.underline.bold.blink.cyan(i)
            : pen.magenta(i),
        )
        .join('  '),
      false,
    );
  }
  //   输入为空且有提示时，打印提示信息
  else if (enterText.length == 0 && currentIssue.tip) {
    /**  计算数据长度以便在输入 `tip` 后能够将光标移动道正确的位置  */
    const transformLength = (currentIssue.tip as string)
      .split('')
      .reduce(
        (currentLen, currentEle) =>
          currentLen + ((currentEle.codePointAt(0) as number) > 0xfff ? 2 : 1),
        0,
      );
    // 打印含提示且用户为输入时文本
    _p(' '.concat(pen.green(currentIssue.tip as string)), false);
    // 将光标移送到输入位置
    cursorMoveLeft(transformLength);
  } else {
    // 当不包含提示信息时，打印用户输入的文本
    if (currentIssue.type === 'text') {
      _p(` ${enterText.join('')}`, false);
    }
    // 使用 ** 代替原始输入文本的密码模式
    else {
      _p(` ${enterText.map(() => '*').join('')}`, false);
    }
    // 将光标移送到输入位置
    if (cursorTranslate !== 0) {
      cursorMoveLeft(cursorTranslate);
    }
  }
};
