import pen, { t } from 'color-pen';
import { _blank } from './blank';
import { computerCodePoint } from './computerCodePoint';

/**
 * 格式化帮助文本，让他们值在同一列
 *
 * @type
 *
 *  ```ts
 *    type param =  {
 *        name: string ,
 *        info?: string,
 *        abbr?: string | undefined ,
 *        len :number= 15,    // default = 15
 *        color:  boolean  // default = true
 *    }
 *    ```
 */
export function formatHelpText(_d: {
  name: string;
  info?: string;
  abbr?: string;
  len?: number;
  color?: boolean;
  textDecoration?: boolean;
}) {
  const abbrLimitLength = 6,
    data = Object.assign(
      {
        name: '',
        info: '',
        abbr: '',
        len: 15,
        color: true,
        textDecoration: false,
      },
      _d,
    );
  let str = `${t}${(data.color && 32) || ''}m${_blank}`;
  // 打印含子项的特殊标志
  str += data.textDecoration ? `${t}34;4m` : '';
  // 打印 name
  str += `${data.name.slice(0, data.len)}${t}m`;
  // 打印空白字符
  str += ' '.repeat(data.len + 1 - computerCodePoint(data.name, data.len));
  // 打印 abbr
  str += `${t}${(data.color && 33) || ''}m${
    data.abbr?.slice(0, abbrLimitLength) || ''
  }`;
  // 打印空白字符
  str += ' '.repeat(
    abbrLimitLength + 1 - computerCodePoint(data.abbr || '', abbrLimitLength),
  );
  // 打印 description
  str += data.color ? pen.magenta(data.info) : data.info;
  return str;
}
