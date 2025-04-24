import { _p } from 'a-node-tools';
import { question } from '..';
import test from 'node:test';

test.test('测试与 question 模块相关的内容', async it => {
  await it.test('测试单问模式', async () => {
    const result = await question(
      {
        text: '请输入你的名字',
        tip: ['tom', 'jerry'],
        type: 'text',
        private: false,
        resultText: '请输入你的名字',
      },
      true,
    );
    _p(result);
  });
  await it.test('测试简必答', async () => {
    const result = await question(
      {
        text: '请输入你的名字',
        tip: 'tom',
        type: 'text',
        private: false,
        resultText: '请输入你的名字',
        required: true,
      },
      true,
    );
    _p(result);
  });

  await it.test('测试单问非必答', async () => {
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
    _p(result);
  });

  await it.test('测试密码㊙️ 模式', async () => {
    const result = await question(
      {
        text: '请输入你的名字',
        tip: 'tom',
        type: 'password',
        private: false,
        resultText: '请输入你的名字',
        required: false,
      },
      true,
    );
    _p('***************');
    _p(result);
    _p('***************');
  });
});
