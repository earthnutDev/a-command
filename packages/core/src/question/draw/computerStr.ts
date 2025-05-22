import { strInTerminalLength } from 'color-pen';
import { dataStore } from '../data-store';
import { printPassword } from './printPassword';
import { printText } from './printText';

/**
 * 计算渲染字符串模式
 */
export function computerStr(text: string) {
  const { currentIssue } = dataStore;
  /**  终端宽度  */
  const screenWidth = process.stdout.columns;
  /**  剩余可用长度  */
  let remainingUsableLength = screenWidth - strInTerminalLength(text) - 7;
  /**  是否换行  */
  const hasBreak = remainingUsableLength < 5;

  // 需要换行则追加换行符
  if (hasBreak) {
    text += '\n';
    remainingUsableLength = screenWidth - 4;
  }

  // 当不包含提示信息时，打印用户输入的文本
  if (currentIssue.type === 'text') {
    text = printText(text, remainingUsableLength);
  }
  // 使用 ** 代替原始输入文本的密码模式
  else text = printPassword(text);

  return text;
}
