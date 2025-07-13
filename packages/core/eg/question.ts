import { _p } from 'a-node-tools';
import { question } from '..';
import { dev } from '@qqi/dev';
import { isUndefined } from 'a-type-of-js';

dev.skip('测试与 question 模块相关的内容', async it => {
  await it('测试单问模式', async () => {
    const result = await question(
      [
        {
          text: '请输入你的名字',
          tip: ['tom', 'jerry'],
          type: 'text',
          private: true,
          resultText: '请输入你的名字',
        },
        {
          text: '请输入你的名字',
          tip: ['tom', 'jerry'],
          type: 'text',
          private: true,
          resultText: '请输入你的名字',
        },
      ],
      true,
    );
    _p('测试单问模式', false);
    _p(result);
  });
  await it.skip('测试简必答', async () => {
    const result = await question(
      {
        text: '请输入你的名字',
        tip: 'tom',
        type: 'text',
        resultText: '请输入你的名字',
        errorText: '未能获取您的姓名',
        canCtrlCExit: false,
        canCtrlDExit: true,
        // len: 3,
        minLen: 4,
        maxLen: 6,
        verify: [
          {
            reg: /^[a-z]+$/,
            info: '仅允许 a-z 小写英文字符',
          },
          {
            reg: /^jerry$/,
            info: '不可以是 jerry',
            inverse: true,
          },
          {
            reg: /^s/,
            info: 's 开头不吉利',
            inverse: true,
            warn: true,
          },
        ],
      },
      true,
    );
    _p('测试简必答：>', false);
    _p(result);
    _p(isUndefined(result));
    _p();
  });

  await it.skip('测试单问非必答', async () => {
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
    _p('测试单问非必答', false);
    _p(result);
    _p();
  });

  await it.skip('测试密码㊙️ 模式', async () => {
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
    _p('测试密码㊙️', false);
    _p(result);
    _p('***************');
  });
  await it.skip('测试多问模式，简单输出', async () => {
    const result1 = await question([1, 2, 3, 4, 5, 6], true);
    _p(result1);
  });

  await it.skip('测试多问模式，标准输出', async () => {
    const result = await question([1, 2, 3, 4, 5, 6]);

    _p(result);
  });
});
