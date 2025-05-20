import { selection } from '../index';
import { dev } from '@qqi/dev-log';

// await command.selection({ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });

const version = '1.0.1';
const [a, b, c, d] = version.split('.').map(e => Number(e));

/**  测试选择  */
await dev.skip('测试 selection 模块相关的内容', async it => {
  await it('测试选择预测版本', () => {
    const result = selection(
      {
        data: [
          `bug  (patch) v${version} -> ${a}.${b}.${d == undefined ? c + 1 : c}`,
          `新内容 (minor) v${version} -> ${a}.${b + 1}.0`,
          `大换代 (major) v${version} -> ${a + 1}.0.0`,
          `测试版本 (prepatch) v${version} -> ${a}.${b}.${c + 1}-0`,
          `内测版本 (preminor) v${version} -> ${a}.${b + 1}.0-0`,
          `公测版本 (premajor) v${version} -> ${a + 1}.0.0-0`,
          `测试迭代 (prerelease) v${version} -> ${a}.${b}.${
            d == undefined ? c + 1 : c
          }-${d == undefined ? 0 : Number(d) + 1}`,
        ],
        resultText: '请选择版本类型',
        kind: 'check',
        private: false,
      },
      'string',
    );

    console.log(result);
  });
});

await dev('测试新模式', async () => {
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
