import { _p } from 'a-node-tools';
import { selection } from '../index';
import { dev } from '@qqi/dev-log';
import { isString } from 'a-type-of-js';

type T = '123' | '456';

await dev('测试新模式', async () => {
  const result = await selection<symbol | T | number>({
    info: '请问明天吃什么',
    resultText: '你想吃',
    errorText: '看来你不怎么饿',
    private: false,
    required: true,
    kind: 'check',
    canCtrlCExit: true,
    canCtrlDExit: true,
    maxRows: 8,
    data: [
      {
        value: 123,
        label: '456',
        disable: true,
        checked: true,
      },
      {
        value: '123' as T,
        label: '456',
        disable: true,
        checked: true,
      },
      '🕐',
      '🕑',
      '🕒',
      '🕓',
      '🕔',
      '🕕',
      '🕖',
      '🕗',
      '🕘',
      '🕙',
      '🕚',
      '🕛',
    ].map((e, i) =>
      isString(e) ? i.toString().padStart(2, ' ').concat(e.repeat(20)) : e,
    ),
  });
  _p(result);
});
