# a command

[![version](<https://img.shields.io/npm/v/a-command.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-command/issues)

这里是一个用于终端交互的，服务于 [cil](https://earthnut.dev) 类项目

## 安装

```sh
npm install a-command --save
```

## 使用

```js
import { Command } from 'a-command';

const command = new Command<>();
```

## Command 部分

综合部分是把 [`Args`](#args-部分-获取用户启动时参数) 、 [`selection`](#selection-部分-选择模式-) 和 [`question`](#question 部分（问答模式）) 放在一起

具体使用可分别参见他们自己的说明部分

## Args 部分 （获取用户启动时参数）

`Args` 可以获取用户启动该程序传入的参数

解析用户的输入参数

可接受用用操作

```bash
# 直接使用命令名执行
# 将展示默认的 npm 版本更新信息
npx vjj

# 使用命令名加子命令的形式进行执行
# 将展示默认的 `vjj` 的版本信息
npx vjj version

# 使用命令名加子命令及选项的形式进行执行
# `vjj` 的原始执行方式，功能与 `npx vjj` 相同
npx jja update --npm-publish


# 使用命令名 + 子命令 + 选项 + 选项值的形式进行执行
# 使用 `jja` 命令的 `remove` 子命令
# 移除 `dist` 和 `node_modules` 目录
# 且使用 `--ignore` 选项来忽略删除文件/文件夹时的日志信息
npx jja remove  --ignore  dist node_modules
```

**_调用 `run` 后才会开始工作，并且，请在执行 `run` 之前完成所有操作的绑定_**

请注意，执行是有顺序的，当执行完毕 `run` 后，是无法执行 `bind` 操作的。如果你执意要这么做，可能用户会看到奇怪的信息，而这些信息，本来是提醒你的！！！

在执行过程中，可以参看 `state` 值查看。当用户仅是参看版本号或是打印帮助时， `state.code` 会是 4 ，同时返回 `state.overText` 来说明到底是参看版本号还是打印帮助。不建议在 `state.code` 为 4 时再执行其他命令。你也可以打印一些其他好玩的

示例：

倘若你的执行前缀为 `jja` , 可用：

- **当你有多个配置项时，可把符合规则的配置项放入数组**
- **缩写请尽量避开 `-h`、`-v`**
- **`-v`/`version` 的优先级要高于`-h`/`help`**
- **使用字符串参数时，注意 `<>` 和 `()` 均为英文符号**

1. 最简单的例子

   ```js
   import { Args } from "a-command";
   const command: Args = new Args('jja');
   command.bind("init <-i> (初始化一个配置文件)").run();
   ```

2. 不带子项的配置

   ```js
     import { Args } from "a-command";
     const command: Args = new Args('jja');
     command
       .bind({
         name: "init",
         abbr: "-i",
         info: "初始化一个配置文件",
       })
       .run();
   ```

3. 带子项配置（子项纯文本的）

   ```js
   import { Args } from "a-command";
   const command: Args = new Args('jja');
   command.bind({
     name: "init",
     abbr: "-i",
     info: "初始化一个配置文件",
     options: [
       "ts <-t> (初始化一个 `ts` 后缀配置文件)",
       "js <-j> (初始化一个 `js` 后缀配置文件)",
       "json <-o> (初始化一个 `json` 后缀配置文件)",
     ],
   });
   command.run(); // Users can use `gig init -o`
   ```

4. 全配置的

   ```js
   import { Args } from "a-command";
   const command: Args = new Args('jja');
   command.bind({
     name: "init",
     abbr: "-i",
     info: "初始化一个配置文件",
     options: [
       {
         name: "ts",
         abbr: "-t",
         info: "初始化一个 `ts` 后缀配置文件",
       },
       {
         name: "js",
         abbr: "-j",
         info: "初始化一个 `js` 后缀配置文件",
       },
       {
         name: "json",
         abbr: "-o",
         info: "初始化一个 `json` 后缀配置文件",
       },
     ],
   });
   command.run(); // Users can use `gig init -o`
   ```

5. 怪异行为绑定参数：

   ```ts
   import { Args } from 'a-command';
   const command: Args = new Args('jja');
   command.bind({
     'init <-i> (初始化项目)': [
       'ts  (初始化一个 ts 配置文件)',
       'js  (初始化一个 js 配置文件)',
       'json  (初始化一个 json 配置文件)',
     ],
     'create <-c> (添加一个文件)': [
       'ts  (添加一个 ts 配置文件)',
       'js  (添加一个 js 配置文件)',
       'json  (添加一个 json 配置文件)',
     ],
   });
   command.run(); // Users can use `gig init ts`
   ```

6. 最后，可以使用 `args` 来获取用户实际的值输入

   ```ts
       ... // 其他代码
        /**
         *   获取处理后的用户输入的参数
         *
         *   这种模式尽可能的保留了用户输入，但是也舍弃了部分无法识别的输入
         * */
       command.args;
       /**
        *  获取处理后的用户输入的参数的 Object 形式
        *
        *  这种模式更适合用于配置文件
        *
        * **_在这种模式下，`subOptions` 会覆盖上级的 `value`_**
        *
        * */
       command.args.$map;
       /**
        * 为了获取有序的对象值
        *
        * 现 可以通过 `$arrMap` 获取
        *
        */
       command.args.$arrMap;
        /**
         *   获取处理后的用户输入的参数的简单形式
         *
         *  这种模式适合简单的命令，仅查看命令是否有
         * */
       command.args.$only;

     /**
      *
      *    是否为空，判断用户未输入命令参数
      */
       command.args.$isVoid;
       /**
        *
        * 用户原始输入参数
        */
       command.args.$original;

   ```

### 获取当前状态

当前状态可由 `state` 来获取，当 `state.code` 为 4 时，说明用户查看了版本号或是帮助文档或是主动使用 `end` 或 `error` 方法，此时 `state.overText` 会是 `version`、`end`、`error` 或 `help` 来表示到底是查看了版本号还是帮助文档

```ts
import { Command } from 'a-command';

const _p = console.log;
const command = new Command();
/**
 * 当使用带 -h 或者  -v 的参数测试的时候内部解析会标记为已结束状态, 但是是否结束看具体需求
 *
 * `isEnd` 是一个判断当前状态的方法，返回一个布尔值，标记当前的状态是否可用。
 *
 * 返回 `false` 值说明当前未结束，返回 `true` 值说明当前已经结束，但是并不会主动退出程序
 *
 * 除非你在调用 `isEnd` 时显示传入 `true` 值，用以主动退出程序
 *
 */
_p(command.isEnd()); // 打印是否结束，一个 `boolean` 值
_p(command.isEnd(true)); // 如果想在 `-v` 或 `-h` 时主动退出程序，可传入 `true` 值
_p(command.state); // 打印当情状态
_p(command.state.code); // 打印当情状态
command.state.overText; // 结束文本   "version" | "help" | "end" | "error";

// 任何时刻都可以用的
command.end(); // 主结束程序
// 使用 `error` 是抛出错误而不是简单的退出层序
// 在某些时候，简单是优雅退出程序会被作为层序结束的消息传递给下一个进程
// 此时，你可以使用 `error` 来抛出错误，而不是简单的退出层序
command.error(); /// 将抛出错误并退出 node 程序
```

### 主动使用帮助文档

现在可通过调用 `help` 方法主动展示帮助文档

- _主动调用的，说我希望你能用全拼_

```ts
command.help();
command.help('init'); // 展示 init 命令信息
command.help('init', 'vue'); // 展示 init 下的 vue 命令信息
```

### 主动使用版本说明

现在可通过调用 `version` 方法主动展示版本信息

```ts
command.version();
```

### 打字稿（Typescript）支持

现在支持 `Typescript` ，你可以使用 `Typescript` 来使用你的返回值

```ts
import { Args } from 'a-command';

const command: Args = new Args('vjj');

command.bind({});

command.run().isEnd(true); // 在触发了 `-h` 或 `-v` 后，会自动结束程序
```

## question 部分（问答模式）

`question` 是一个问答模式，可使用其向用户进行提问或是简单的选择使用。可引用该函数后，在需要的位置使用
_等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`_

### 示例

最简单的使用

```js
import { question } from 'a-command';
const result = await question('中午吃什么');
```

使用自定义配置，可以给用户更好的体验。

```js
import { isUndefined } from 'a-type-of-js';
import { question } from 'a-command';

const result = await question({
  text: '中午吃什么', // 必须的参数
  tip: '板面还是油泼面', // 可选参数，为数组时进入选择模式
  type: 'text', // 一个类型选择，支持 `text` 、 `password`
  private: false, // 选择完毕后是否覆盖
  resultText: '你想吃的是', // 可选参数，选择后展示
  errorText: '你丫的看起来是不饿', // 可选参数，用户双击 esc 退出
  required: true, // 可选参数，是否必填
  default: '板面', // 可选参数，默认值
  canCtrlCExit: true, // 可选参数，是否允许用户使用 `Ctrl + C` 退出
  canCtrlDExit: true, // 可选参数，是否允许用户使用 `Ctrl + D` 退出
  len: 5, // 限制用户输出长度为 5， 该值优先级高于 `minLen`、`maxLen`，却低于 `verify` 校验
  minLen: 5, // 限制用户输入长度不低于 5，优先级高于 `maxLen`
  maxLen: 5, // 限制用户输入长度不超过 5，校验优先级最低
  verify: [
    {
      reg: /^[a-z]+$/, // 限制输入仅可以是小写英文字符
      info: '您仅可以使用小写英文字符',
    },
    {
      reg: /^.{5}$/, // 限定输入仅为长度为 5
      info: '输入长度仅可以为 5',
    },
  ],
});

if (isUndefined(result)) {
  process.exit(1);
}
```

还可以配置 `tip` 为数组，将问答配置为简单的选择，这时候用户仅可以在 `tip` 提供的值中进行选择 **仅适用于简单选择，类似于 `yes` or `no` 或者 `男` or `女` 这种，字多的选项，建议使用 [selection](#selection-部分-选择模式-)**

在使用的时候，不建议使用 `verify` 来限制字符数，更推荐使用 `len` 、`minLen`、`maxLen` 来限定输入长度。因为 `verify` 是**_输入校验_**，而 `len`、`minLen`、`maxLen` 是**_enter 确认触发校验_**。

```js
import { question } from 'a-command';

const result = await question({
  text: '中午吃什么',
  tip: ['板面', '油泼面'],
  resultText: '那我们就去吃',
  errorText: '不饿，不饿算了，我自己去吃油泼面了',
});
```

配置 `type` 为 `password` 即为密码模式

也可以一次提供多个提问，只需放置于数组之中即可（数组与对象模式可混搭）

```js
import { question } from 'a-command';
const result = await question([
  {
    text: '中午吃什么',
    tip: ['板面', '油泼面'],
    type: 'text',
  },
  {
    text: '你最喜欢的甜点是',
    private: true,
  },
  '吃完饭去哪里玩呢',
]);
```

## selection 部分（ 选择模式 ）

可引用该函数后，在需要的位置使用
_等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`_

示例

最简单的使用

```js
import { selection } from 'a-command';

const _p = console.log;

_p('中午吃什么');

const result = await selection([
  '包子',
  '河北特产之正宗安牛肉徽板面',
  '烧烤',
  '麻辣烫',
  '火锅',
]);
```

全配置模式

```js
import { selection } from 'a-command';

type Eating = '包子' | '板面' | '烧烤' | '麻辣烫' | '火锅';

const eatList: Eating[] = ['包子', '板面', '烧烤', '麻辣烫', '火锅'];

const result: Eating | undefined = await selection<Eating>({
  info: '中午想吃啥子',
  data: ,
  resultText: '走，我们就去吃',
  errorText: '你丫的不饿就算了',
});

if (result === '包子') {
  console.log('不，我就要吃火锅');
}
```

## 文档地址

参看 [https://earthnut.dev/a-command/](https://earthnut.dev/a-command/)
