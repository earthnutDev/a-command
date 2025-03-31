# a command

[![version](<https://img.shields.io/npm/v/a-command.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![NPM Last Update](<https://img.shields.io/npm/last-update/a-command?logo=npm&label=版本最后更新&labelColor=rgb(255,36,63)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![📦 size](<https://img.shields.io/bundlephobia/minzip/a-command.svg?logo=npm&label=压缩包大小&labelColor=rgb(201,158,140)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![downloads](<https://img.shields.io/npm/dm/a-command.svg?logo=npm&logoColor=rgb(0,0,0)&label=月下载量&labelColor=rgb(194,112,210)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![downloads](<https://img.shields.io/npm/dt/a-command.svg?logo=npm&label=总下载量&labelColor=rgb(107,187,124)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command)

[![last commit](<https://img.shields.io/github/last-commit/earthnutDev/a-command.svg?logo=github&logoColor=rgb(0,0,0)&label=最后推码&labelColor=rgb(255,165,0)&color=rgb(0,0,0)>)](https://github.com/earthnutDev/a-command) [![GitHub commit activity](<https://img.shields.io/github/commit-activity/y/earthnutDev/a-command.svg?logo=github&label=推码数&labelColor=rgb(128,0,128)&color=rgb(0,0,0)>)](https://github.com/earthnutDev/a-command) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/a-command?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/a-command?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/a-command/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/a-command)

[![查看 📔 日志](<https://img.shields.io/badge/👀-日_%20_志-rgb(0,125,206)>)](https://github.com/earthnutDev/a-command/blob/main/CHANGELOG.md) [![bug 🙋‍♂️ 提交](<https://img.shields.io/badge/☣️-bug_%20_提交-rgb(255,0,63)>)](https://github.com/earthnutDev/a-command/issues)

---

这里是一个用于终端交互的，服务于 [cil](https://earthnut.dev) 类项目

## 安装

```sh
npm install   a-command  --save
```

## 使用

```js
import Command from 'a-command';
```

### Command 部分 ()

综合部分是把 [`Args`](#args-部分-获取用户启动时参数) 、 [`selection`](#selection-部分-选择模式-) 和 [`question`](#question-部分问答模式) 放在一起

具体使用可分别参见他们自己的说明部分

### Args 部分 （获取用户启动时参数）

`Args` 可以获取用户启动该程序传入的参数

解析用户的输入参数

可接受用用操作

- `commandName argName`
- `commandName argName value`
- `commandName argName optionName`
- `commandName argName optionName value`

**_调用 `run` 后才会开始工作，并且，请在执行 `run` 之前完成所有操作的绑定_**

请注意，执行是有顺序的，当执行完毕 `run` 后，是无法执行 `bind` 操作的。如果你执意要这么做，可能用户会看到奇怪的信息，而这些信息，本来是提醒你的！！！

在执行过程中，可以参看 `state` 值查看。当用户仅是参看版本号或是打印帮助时， `state.code` 会是 4 ，同时返回 `state.overText` 来说明到底是参看版本号还是打印帮助。不建议在 `state.code` 为 4 时再执行其他命令。你也可以打印一些其他好玩的

示例：

倘若你的执行前缀为 `ixxx` , 可用：

- **当你有多个配置项时，可把符合规则的配置项放入数组**
- **缩写请尽量避开 `h`、`v`**
- **使用字符串参数时，注意 `<>` 和 `()` 均为英文符号**

- 最简单的例子

  ```js
  import { Args } from "a-command";
  const command: Args = new Args('ixxx');
  command.bind("init <-i> (初始化一个配置文件)").run();
  ```

- 不带子项的配置

```js
  import { Args } from "a-command";
  const command: Args = new Args('ixxx');
  command
    .bind({
      name: "init",
      abbr: "-i",
      info: "初始化一个配置文件",
    })
    .run();
```

- 带子项配置（子项纯文本的）

  ```js
  import { Args } from "a-command";
  const command: Args = new Args('ixxx');
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

- 全配置的

  ```js
  import { Args } from "a-command";
  const command: Args = new Args('ixxx');
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

- 怪异行为绑定参数：

```ts
import { Args } from 'a-command';
const command: Args = new Args('ixxx');
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

- 最后，可以使用 `args` 来获取用户实际的值输入

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

获取当前状态

```ts
import { _p } from 'a-node-tools';
import { Command } from 'a-command';
const command = new Command();
/**
 * 当使用带 -h 或者  -v 的参数测试的时候内部解析会标记为已结束状态, 但是是否结束看具体需求
 *
 * isEnd 是一个扩展后的 Boolean  数据, 上面携带 end 属性, 用于结束状态
 *
 *  即在 isEnd 值为 true 时, 访问 end 属性会结束当前程序
 */
_p(command.isEnd); // 打印是否结束，一个 `boolean` 值，你也可以知啊结束后根据 `state` 来获取具体信息来干其他的
_p(command.isEnd.end); //如果你在用户使用帮助文档或是打印版本信息后没有其他事情，可以使用结束
_p(command.state); // 打印当情状态
_p(command.state.code); // 打印当情状态
command.state.overText; // 结束文本   "version" | "help";
command.error; /// 将抛出错误并退出 node 程序
```

#### 主动使用帮助文档

现在可通过调用 `help` 方法主动展示帮助文档

- _主动调用的，说我希望你能用全拼_

```ts
command.help();
command.help('init'); // 展示 init 命令信息
command.help('init', 'vue'); // 展示 init 下的 vue 命令信息
```

#### 主动使用版本说明

现在可通过调用 `version` 方法主动展示版本信息

```ts
command.version();
```

### question 部分（问答模式）

`question` 是一个问答模式，可使用其向用户进行提问或是简单的选择使用。可引用该函数后，在需要的位置使用
_等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`_

#### 示例

最简单的使用

```js
import { question } from 'a-command';
const result = await question('中午吃什么');
```

使用自定义配置，可以给用户更好的体验。

```js
import { question } from 'a-command';
const result = await question({
  text: '中午吃什么', // 必须的参数
  tip: '板面还是油泼面', // 可选参数，为数组时进入选择模式
  type: 'text', // 一个类型选择，支持 `text` 、 `password`
  private: false, // 选择完毕后是否覆盖
  resultText: '你想吃的是', // 可选参数，选择后展示
});
```

还可以配置 `tip` 为数组，将问答配置为简单的选择，这时候用户仅可以在 `tip` 提供的值中进行选择 **仅适用于简单选择，类似于 `yes` or `no` 或者 `男` or `女` 这种，字多的选项，建议使用[selection](#selection-部分-选择模式-)**

```js
import { question } from 'a-command';

const result = await question({
  text: '中午吃什么',
  tip: ['板面', '油泼面'],
  resultText: '那我们就去吃',
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

### selection 部分（ 选择模式 ）

可引用该函数后，在需要的位置使用
_等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`_

示例

最简单的使用

```js
import { _p } from 'a-node-tools';
import { selection } from 'a-command';

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
const result = await selection({
  showInfo: true,
  info: '中午想吃啥子',
  data: ['包子', '板面', '烧烤', '麻辣烫', '火锅'],
  showPreview: true,
  preview: '当前选的是',
  resultText: "Okay, then let's go eat ",
});
```

_如果你不想展示预览，可以使用传入对象的模式（设置 `showPreview: false`）进行自定义配置_

## 文档地址

参看 [https://earthnut.dev/a-command/](https://earthnut.dev/a-command/)
