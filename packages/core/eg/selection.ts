import { selection } from '../index';
import { dev } from '@qqi/dev-log';

await dev.skip('测试新模式', async () => {
  const result = await selection(
    {
      info: '请问明天吃什么',
      resultText: '你想吃',
      private: false,
      required: true,
      kind: 'check',
      canCtrlCExit: true,
      canCtrlDExit: true,
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
    },
    'number',
  );
  console.log(result);
});
