import { dataStore } from '../data-store';
import { printPassword } from './printPassword';
import { printText } from './printText';

/**
 * 计算渲染字符串模式
 */
export function computerStr(text: string) {
  const { type, usableLength } = dataStore.currentIssue;
  // 当不包含提示信息时，打印用户输入的文本
  if (type === 'text') {
    text = printText(text, usableLength);
  }
  // 使用 ** 代替原始输入文本的密码模式
  else {
    text = printPassword(text);
  }

  return text;
}
