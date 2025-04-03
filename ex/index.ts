import { _p } from 'a-node-tools';
import { Command, question, selection } from '../index';

const command = new Command();

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
command.run().isEnd.end;

// await command.selection({ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });

const version = '1.0.1';
const [a, b, c, d] = version.split('.');

/**  测试选择  */
await (async skip => {
  if (skip) return;

  await selection({
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
    showPreview: false,
    preview: '请选择版本类型',
    resultText: '请选择版本类型',
    private: false,
  });
})(true);

// 测试问答输入模式
await (async skip => {
  if (skip) return;
  const result = await question(
    {
      text: '请输入你的名字',
      tip: 'tom',
      type: 'text',
      private: false,
      resultText: '请输入你的名字',
      required: false,
    },

    true,
  );
  _p('***************');
  _p(result);
  _p('***************');
})(false);
