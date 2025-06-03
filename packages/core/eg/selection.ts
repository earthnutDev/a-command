import { _p } from 'a-node-tools';
import { selection } from '../index';
import { dev } from '@qqi/dev-log';

await dev.skip('测试新模式', async () => {
  const result = await selection<'123'>({
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
    ].map((e, i) => i.toString().concat(e.repeat(20))),
  });
  _p(result);
});
