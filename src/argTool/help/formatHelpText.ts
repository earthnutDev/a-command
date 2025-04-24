import pen from 'color-pen';
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
  let str = pen[data.color ? 'green' : 'black'](_blank);
  // 打印含子项的特殊标志
  // 打印 name
  str += pen[data.textDecoration ? 'blue' : 'black'](
    data.name.slice(0, data.len),
  );
  // 打印空白字符
  str += ' '.repeat(data.len + 1 - computerCodePoint(data.name, data.len));
  // 打印 abbr
  str += pen[data.color ? 'yellow' : 'black']`${
    data.abbr?.slice(0, abbrLimitLength) || ''
  }${' '.repeat(
    abbrLimitLength + 1 - computerCodePoint(data.abbr || '', abbrLimitLength),
  )}`;
  // 打印空白字符
  // 打印 description
  str += data.color ? pen.magenta(data.info) : data.info;
  return str;
}
