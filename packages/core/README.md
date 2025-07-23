# a command

[![version](<https://img.shields.io/npm/v/a-command.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-command) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-command/issues)

这里是一个用于终端交互的，服务于 [jja](https://www.npmjs.com/package/jja)、[create a npm](https://www.npmjs.com/package/create-a-npm) 等类项目

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

综合部分是把 [`Args`](#args-部分-获取用户启动时参数) 、 [`selection`](#selection-部分-选择模式-) 和 [`question`](#selection-部分-选择模式-) 放在一起

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

### 实例属性及方法

#### 属性

| 属性     | 释义                                                                |
| :------- | :------------------------------------------------------------------ |
| `args`   | 绑定后解析到的值                                                    |
| `name`   | 当前程序的名，请在初始化时设定该值                                  |
| `state`  | 当前运行的状态，绑定前为 1、解析前为 2、结束前为 3、结束时将为 4    |
| `values` | 旧版本中用于获取用户的原始参数，先可通过 `args.$noMatch` 获取相同值 |

#### 方法

| 属性或方法名 | 释义                                                                        |
| :----------- | :-------------------------------------------------------------------------- |
| `bind`       | 进行绑定参数                                                                |
| `end`        | 比较平和的方式终结程序，等同于 `process.exit(0)`                            |
| `error`      | 直接抛出错误中断程序，等同于 `process.exit(1)`                              |
| `help`       | 主动使用帮助文档                                                            |
| `isEnd`      | 判断当前进程是否完结，若正常流程已完结，且需中断程序，可使用可选参数 `true` |
| `run`        | 绑定好参数后执行参数的解析，后续再进行绑定参数将会报错                      |
| `version`    | 主动使用版本说明                                                            |

### 绑定

(1) 最简单的例子

```js
import { Args } from "a-command";

const command: Args = new Args('jja');
command.bind("init <-i> (初始化一个配置文件)").run();
```

(2) 不带子项的配置

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

(3) 带子项配置（子项纯文本的）

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

(二) 全配置的

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

(三) 怪异行为绑定参数：

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

(四) 最后，可以使用 `args` 来获取用户实际的值输入

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

### 参数

- 可使用字符串或者数值作为问题进行单问题提问
- 也可以使用对象配置问题的细节
- 使用以上两种混合的数组进行多问

对象参数的属性：

| 可用属性       |                   类型                    | 释义                                                                               |
| :------------- | :---------------------------------------: | :--------------------------------------------------------------------------------- |
| `text`         |            `string \| number`             | 唯一的必须属性，问题本身文本                                                       |
| `tip`          | `string \| number\| (number \| string)[]` | 可选属性，用户输入提示，该值为数组时将转化为简单的选择模式， `yes` or `no`         |
| `type`         |          `"text" \| "password"`           | 可选属性，当前问题的类型，缺省为 `text` ，还可使用 `password` 设定为密码模式       |
| `private`      |                 `boolean`                 | 可选属性，缺省值为 `true`，因为默认的返回样式连我自己都不怎么喜欢就给阉了          |
| `errorTex`     |                 `string`                  | 可选参数，在发生异常时的返回提示文本                                               |
| `required`     |                 `boolean`                 | 可选参数，用户是否为必须，缺省值为 `true` ，默认不允许空执行输入确认               |
| `defaultValue` |                 `string`                  | 可选参数，在允许用户不输入时使用的值                                               |
| `canCtrlCExit` |                 `boolean`                 | 可选参数，是否可以使用 `ctrl + c` 键退出。缺省值为 `false`                         |
| `canCtrlDExit` |                 `boolean`                 | 可选参数，是否可以使用 `ctrl + d` 键退出。缺省值为 `false`                         |
| `minLen`       |                 `number`                  | 可选参数，输入检验，允许的最小长度（仅在确认输入时校验）                           |
| `len`          |                 `number`                  | 可选参数，输入校验，允许的长度值，限定死数（仅在确认输入时检验）                   |
| `maxLen`       |                 `number`                  | 可选参数，输入校验，允许的最大长度值（仅在确认输入时检验）                         |
| `verify`       |           [`object`](#校验部分)           | 可选参数，输入检验，会在用户的每次敲击键盘时进行校验（长度限制请使用长度专有限定） |

#### 校验部分

使用 `verify` 可以在用户使用键盘时进行回应，其验证是按绪进行的。

| 验证属性  |   类型    | 释义                                                                          |
| :-------- | :-------: | :---------------------------------------------------------------------------- |
| `reg`     | `regexp`  | 必须参数，验证的正则                                                          |
| `info`    | `string`  | 必须参数，验证失败（`inverse` 值未显式设置为 `true`）时显示的文本，且禁止提交 |
| `inverse` | `boolean` | 可选参数，设置为 `true` 意味着 `reg.test(input)` 为 `true` 则显示提示         |
| `warn`    | `boolean` | 可选参数，设置为 `true` 将在验证匹配后仅显示提示信息，而不阻止提交信息        |

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
    {
      reg: /^tom$/,
      info: '不可以为 tom 呦',
      inverse: true, // 禁止该正则完全匹配
    },
    {
      //  当无设置 inverse 时，该正则为 false 时展示 info
      //  设置 inverse 时，则该正则为 true 时展示 info
      reg: /^jerry$/,
      info: '不可以为 tom 呦',
      inverse: true, // 禁止该正则完全匹配
      warn: true， // 启用此项则显示提示文本而不影响最后的
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

### question 展示效果

#### 一般展示效果

```bash
▶︎ 请输入你的名字:  tom
```

#### 当设定必选项

```bash
▶︎ *请输入你的名字*:  tom
```

#### 设定必选却没有输入时直接按 enter 键

（下面的 `tom` 是提示值而非用户输入值）

```bash
▶︎ *请输入你的名字*:  tom
   请输入你的名字    👆
```

#### 包含检验时

```bash
▶︎ *请输入你的名字*:  1
仅允许 a-z 小写英文字符
```

#### 输入较长而终端显示不足

```bash
# 此时光标位置在 9 之后
▶︎ *请输入你的名字*:  ...5468797987979788979
# 此时光标位置在 5 之上（再次输入将输入到 5 之前）
▶︎ *请输入你的名字*:   ...432123456789876...
# 此时光标位置在第二个 8 之上
▶︎ *请输入你的名字*:   1234567898765432123...
```

## selection 部分（ 选择模式 ）

可引用该函数后，在需要的位置使用
_等待用户输入的一个函数。因为要等待，所以是异步的，使用的时候应当使用 `await`_

在 `selection` 的 kind 值为 'check' 时，可用快捷键 `ctrl + a` 全选、`ctrl + z` 取消全选、`ctrl + r` 全反选，且该三个快捷键无法像 `ctrl +c` 或是 `ctrl + d` 一样自定义取消。

### 参数类型

使用参数可为简答的数组或是配置对象。而为数组时，数组的元素也可使用子配置对象进行配置，但由于是默认的数组模式进入，默认为单选模式，是否是否子配置已经没那么重要了。

也就意味着，仅只有在使用全配置对象时，使用数据的子配置对象来标记数据，在多选的模式下才能达到预期的效果

#### 数组参数模式

在进行参数解析时，如果参数为数组，则直接将该数组作为全配置的 `data` 值进行使用

```ts
import { selection } from 'a-command';

await selection(['米饭', '馒头']);

/**  等同于 */

await selection({
  data: ['米饭', '馒头'],
});
```

#### 全配置

| 属性           |                       类型                        | 释义                                                 |
| :------------- | :-----------------------------------------------: | :--------------------------------------------------- |
| `data`         | `(string \| number \| electionParamObjectData)[]` | 唯一必须参数，选项数据                               |
| `info`         |                     `string`                      | 可选参数，展示的文本                                 |
| `errorText`    |                     `string`                      | 可选参数，出错时展示的文本信息                       |
| `resultText`   |                     `string`                      | 可选参数，交互结束时展示的文本信息                   |
| `required`     |                     `boolean`                     | 可选参数，是否为必须（在多选模式下可能有用）         |
| `private`      |                     `boolean`                     | 可选参数，交互完成时候展示 `resultText`              |
| `canCtrlCExit` |                     `boolean`                     | 可选参数，是否允许使用 `ctrl + c` 键退出             |
| `canCtrlDExit` |                     `boolean`                     | 可选参数，是否可以使用 `ctrl + d` 键退出             |
| `maxRows`      |                     `number`                      | 可选参数，最多可展示的行数。但，实际渲染受中终端限制 |
| `kind`         |               `'radio' \| 'check'`                | 可选参数。控制当前交互类型，缺省值为 `'radio'`       |

### electionParamObjectData 子对象

| 属性      |                类型                | 释义                                           |
| :-------- | :--------------------------------: | :--------------------------------------------- |
| `value`   | `string \| number \| symbol \|  T` | 必须属性。选择后返回的实际值                   |
| `label`   |         `string \| number`         | 必须属性。实际展示的文本信息                   |
| `checked` |             `boolean`              | 可选参数。仅在多选模式下可用，可设定为默认选中 |
| `tip`     |              `string`              | 可选参数。在可用时显示提示信息                 |
| `disable` |             `boolean`              | 可选参数。该项是否能被选择                     |

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

const eatList: Eating[] = [{
  value: '包子'，
  label: '包子',
  disable: true
}, '板面', '烧烤', '麻辣烫', '火锅'];

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

- 由于历史原因，第二参数不使用或为 'string' 时，以使用的范性为准，缺省值 `string` 类型
- 由于为了更好的处理范性的问题，在使用对象类型的数据时，使用 `kind` 属性没有明显的提示（使用该参数大多场景是为了配置值为 `check` ，配置为 `radio` 等同与未配置，所有提示中仅包含了 `check` ，但不意味着仅能配置为 `check` ，亦可配置为 `radio` ，等同于未配置该属性）

### selection 展示效果

#### 一般效果

普通的单选模式标准的展示，当前无禁用项，无被隐藏项

```bash
▶︎  请问明天吃什么

 ◦  串串
 ●  火锅
 ◦  冒菜
 ◦  麻辣烫
```

#### 多选模式

在多选模式下，需使用空格或是键盘上的左右键进行切换当前项的状态。而当前项并不像单选模式是以不同符号，而是不同的色值区分（展示的不出色差效果）

```bash
▶︎  你喜欢的明星

 ■  元龙
 ■  成龙
 ■  元彪
 □  元奎
 □  元华 （倘若此项为光标所在项，此项的前缀为绿色，在支持闪烁的终端闪烁）
 □  元武
 □  元泰
```

#### 有隐藏项

当终端的尺寸不足或使用者主动设置了展示的项数值时，产生了隐藏。

展示当前项在数据的上部时：

```bash
▶︎  您的老家在哪里

 ◦ 北京
 ● 上海
 ◦ 天津
 ◦ 重庆
 ◦ 河北
 ◦ 山西
 ◦ 黑龙江
 ...
```

展示当前项在数据的中部时：

```bash
▶︎  您的老家在哪里

 ...
 ◦ 安徽
 ◦ 浙江
 ● 福建
 ◦ 湖北
 ◦ 湖南
 ◦ 广东
 ◦ 广西
 ...
```

当展示项在数据的底部时

```bash
▶︎  您的老家在哪里

 ...
 ◦ 陕西
 ◦ 甘肃
 ◦ 青海
 ◦ 宁夏
 ◦ 新疆
 ◦ 香港
 ● 澳门
 ◦ 台湾
```

#### 包含禁用项

当包含不可用项时，会展示一个包含不可选择的前缀，在使用时，这些项不可被选中，但其状态可由初始化时传入的数据进行决定。

```bash
▶︎ 请预测下一个火的地方旅游

 ⊗ 山东淄博
 ⊗ 甘肃天水
 ⊗ 邯郸大名
 ⊗ 河南安阳
 ◦ 四川四姑娘山
 ● 贵州镇远
 ◦ 云南泸沽湖
 ◦ 内蒙额济纳旗
```

## 文档地址

参看 [https://earthnut.dev/a-command/](https://earthnut.dev/a-command/)
