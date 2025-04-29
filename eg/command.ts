import { _p, runOtherCode } from 'a-node-tools';
import { Command } from '../index';
import pen from 'color-pen';
import { dev } from '@qqi/dev-log';

/**    */
const command = new Command<{
  a: undefined;
  b: 'aa' | 'bb' | 'cc';
  c: undefined;
  d: 'aaa' | 'bbb' | 'ccc';
}>('test');

await runOtherCode({ code: 'ls', printLog: false });

process.on('exit', () => {
  _p(pen.brightRed('\n\n程序已运行结束，我是 exit 事件'));
  _p(command.isEnd());
  _p(command.state);
});

command.bind('a <-a> (是 a 呀)').bind({
  'b <-b> (是 b 呀)': ['aa', 'bb', 'cc'],
  'c <-c> (是 c 呀)': [],
  'd <-d> (是 d 呀)': ['aaa', 'bbb', 'ccc'],
});

command.run();

const arg = command.args;

console.log('****--*-*-*-*-*-*-*-*-');

if (arg) {
  _p('$map');
  dev('测试 $map', () => {
    _p(arg.$map);
    for (const key in arg.$map) {
      _p('****');
      _p(key);
      _p(arg.$map.b?.aa);
      _p(arg.$map.b?.aa);
      _p(arg.$map.b?.aa?.[0]);
      _p('****');
    }
  });

  dev.skip('测试 $arrMap', () => {
    _p('$arrMap');
  });
}

// await command.question('请输入一个值');
// command.end();
