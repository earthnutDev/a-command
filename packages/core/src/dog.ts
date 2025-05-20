import Dog from '@qqi/dev-log';
import { isFalse } from 'a-type-of-js';

/**  尽在测试环境执行的打印信息  */
export const dog = new Dog({
  name: 'a command',
});

console.log('dog', dog.type);

/**  区分执行环境 该值为 true 为非测试环境 */
export const dun = isFalse(dog.type);
