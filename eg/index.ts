import './question';

import './selection';

import './command';
import { selection } from '../src/selection/selection';

await selection({
  info: '请问明天吃什么',
  resultText: '你想吃',
  data: ['a', 'b'],
});
