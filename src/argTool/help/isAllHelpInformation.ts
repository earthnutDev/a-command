import { _p } from 'a-node-tools';
import pen from 'color-pen';
import { AuxiliaryData } from '../auxiliaryData';
import { printLine } from './printLine';
import { printHelpAndVersion } from './printHelpAndVersion';

/**
 *
 * 打印所有的子命令
 *
 */
export function isAllHelpInformation(auxiliaryData: AuxiliaryData) {
  _p(
    `${pen.brightRed(' 可使用:')}  ${
      auxiliaryData.name
    }  options/abbr  [subOptions/subAbbr  [value]]\n\n${pen.random('选项:')}\n`,
  );
  const len = printLine(auxiliaryData.originalBind);

  /** 打印必须项 */
  printHelpAndVersion(len);
}
