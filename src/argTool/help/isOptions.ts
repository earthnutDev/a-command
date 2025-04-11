import { _p } from 'a-node-tools';
import pen from 'color-pen';
import { AuxiliaryData } from '../auxiliaryData';

/**
 *
 *  打印某一个选项的帮助信息
 *
 */
export function isOptions(auxiliaryData: AuxiliaryData): void {
  const commandName = auxiliaryData.name;
  const subCommandWithOptions = (auxiliaryData.helpInfo as []).join('   ');
  const subCommandDescribe =
    auxiliaryData.originalBind[auxiliaryData.helpInfo[0]]['options']![
      auxiliaryData.helpInfo[1]
    ].info;

  _p(
    `${pen.cyan(' 可使用:')}  ${commandName}   ${subCommandWithOptions}   [value]
${pen.green(' 描述:')} ${subCommandDescribe}`,
  );
}
