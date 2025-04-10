import { _p } from 'a-node-tools';
import { Command } from '..';
import pen from 'color-pen';

/**    */
const command = new Command<{
  a: undefined;
  b: 'aa' | 'bb' | 'cc';
  c: undefined;
  d: 'aaa' | 'bbb' | 'ccc';
}>('test');

process.on('exit', () => {
  _p(pen.random('\n\n程序已运行结束，我是 exit 事件'));
  _p(command.isEnd);
  _p(command.state);
});

command.bind({
  'a <-a> (是 a 呀)': [],
  'b <-b> (是 b 呀)': ['a', 'bb', 'cc'],
  'c <-c> (是 c 呀)': [],
  'd <-d> (是 d 呀)': ['aaa', 'bbb', 'ccc'],
});

command.run().isEnd.end();

const arg = command.args;

if (arg) {
  _p(arg);
  _p(arg.$map);
  _p(arg.$arrMap);
  _p('****-');

  arg.$arrMap.forEach(currentEle => {
    for (const key in currentEle) {
      const element = currentEle[key as keyof typeof currentEle];
      _p(element);

      if (element && element?.options && element?.options?.length > 0) {
        _p(element?.options);
      }
    }
  });
}
// await command.question('请输入一个值');
command.end();
