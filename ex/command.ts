import { Args } from '..';

const command = new Args('test');

process.on('exit', () => {
  console.log(command.isEnd);
  console.log(command.state);
});

command.run();

setTimeout(() => {
  command.help();
}, 1200);
