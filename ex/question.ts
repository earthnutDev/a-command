import { _p } from 'a-node-tools';
import { question } from '..';

// 测试问答选择模式模式
await (async skip => {
  if (skip) return;
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
  _p('***************');
  _p(result);
  _p('***************');
})(true);

await (async skip => {
  if (skip) return;
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
  _p('***************');
  _p(result);
  _p('***************');
})(true);

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
})(true);

await (async skip => {
  if (skip) return;
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
})(true);
