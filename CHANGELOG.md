# 更新日志

## todo

### args

- default
- options
- type
- hide

### question

- default
- data type

## 0.1.0 (3 月 30 日 2025 年)

- 更新了依赖
- 优化了 `args` 的返回值，现在添加 `error` ，用于指示未匹配的参数数据

## 0.0.8 (12 月 15 日 2024 年)

- 维护了代码源 github 的地址

## 0.0.3 (7 月 18 日 2024 年)

- 优化了 `args` 的返回值，现在添加 `values` ，用于指示未匹配的参数数据

## 0.0.2 (7 月 12 日 2024 年)

- 依赖中有问题更新

## 0.0.0 (7 月 12 日 2024 年)

- 换名，永无止境

## 0.0.12 (7 月 8 日 2024 年)

- 优化，永无止境

## 0.0.11 (7 月 8 日 2024 年)

- 优化，永无止境

## 0.0.10 (7 月 8 日 2024 年)

- 去处理 `select` 渲染时的长度截断

## 0.0.9 (7 月 8 日 2024 年)

- 维护了 `select` 返回值的数据类型

## 0.0.8 (7 月 3 日 2024 年)

- 添加了 `eslint` 用作代码检测

## 0.0.6 (6 月 13 日 2024 年)

- 对原状态没有数据未做判断

## 0.0.5 (6 月 日 11 2024 年)

- 修复了 bin 路径错误
- 去除了多余的日志

## 0.0.4 (6 月 11 日 2024 年)

- 维护了导出模式

## 0.0.3 (6 月 10 日 2024 年)

- 修复展示的 `selection` 的第三个元素在选中后及第七个元素未选中状态在终端黑色背景下融于背景
- 修复了 `selection` 在全配置情况下由于 `@ts-ignore` 导致错误未被识别而导致最后博爱错的问题
- 添加了有关 `selection` 及 `question` 部分的测试

## 0.0.3 (6 月 8 日 2024 年)

- 优化了代码。功能上没有改变，不影响（如果之前仅实例化一个 `Command` 的话）之前是使用，现在可是同项目实例化多个 `Command`
- 优化了类型声明

## 0.0.2 (6 月 8 日 2024 年)

- 维护了简单的消息列队，将 `Command`、`question`、`selection` 的调用进行了整理，现在，再也不怕再不同的地方调用他们导致由于异步而产生的尴尬了

## 0.0.1 (6 月 5 日 2024 年)

- `arg` 部分返回的 `arg` 属性添加了 `$arrMap` 属性，即避免了 `args.$map` 属性的无序性，有保证了其结构易用性
- 整理了 `args` 的返回值，不再在 `value` 值为空数组时仅返回 `true`，也不再在 `value` 值为一个元素的数组是返回该元素。原本以为这么会简便些，在实际使用中发现需要做大量的判断

## 0.0.0 (6 月 4 日 2024 年)

- 项目做了迁移

## 0.0.39 (6 月 3 日 2024 年)

- 添加了对 windows 的支持
- `selection` 添加了 `private` 私密模式，不打印结果行
- 把 `readInput`、`Color`、`cursor` 拆分到了 [node-tools](https://github.com/earthnutDev/a-node-tools) ，保持 command 的独立性

## 0.0.36 （6 月 1 日 2024 年）

- 反正也没人用,想升级我就升
- 将 npm 包升级从 `u` 拿出作为子项

## 0.0.33 （6 月 1 日 2024 年）

- 添加静默模式，不打印，不打扰

## 0.0.30 （5 月 31 日 2024 年）

- 修复 `shell` 中的错误

## 0.0.29 （5 月 31 日 2024 年）

- 本来使用的 `node` 的 `rmdir` 和 `rm` ，但是总是报错，算了，用 `shell` 吧

## 0.0.26 （5 月 30 日 2024 年）

- 兼容 windows 中使用该插件出现 `-V` 没有返回值
- 添加 `remove` 命令，用于兼容 window 和 linux 、macos 的移除文件
- 添加 `update` 命令，用于 `npm` 包更新

## 0.0.25 （5 月 27 日 2024 年）

- 去除 `h` 和 `v` 的绝对霸占

## 0.0.22 （5 月 27 日 2024 年）

- 修复主动调用帮助文档出现的错误

## 0.0.22 （5 月 26 日 2024 年）

- 添加可主动调用帮助文档展示和版本展示

## 0.0.16/17/18 （5 月 26 日 2024 年）

- 添加 [Color](./自述文件.md#color-模块) 模块

## 0.0.17/18（5 月 24 日 2024 年）

- 修复已知 bug

## 0.0.16/17/18 （5 月 22 日 2024 年）

- 原往 `Args` 绑定带 `options` 命令时有些麻烦，现在进行了更正

## 0.0.14/15 （5 月 20 日 2024 年）

- 维护了部分数据的类型说明，与上一版本没有功能上的差别

## 0.0.13 （5 月 20 日 2024 年）

- 修复绑定参数后的展示

## [0.0.12](./ReadMe.md#args-section-get-user-start-program-params) （5 月 20 日 2024 年）

- 维护了 `BindParamsType` 类型说明，是体验更加丝滑

## [0.0.11](./ReadMe.md#args-section-get-user-start-program-params) （5 月 19 日 2024 年）

- 添加 `args` 的 `$isVoid` 属性

## [0.0.10](./ReadMe.md#args-section-get-user-start-program-params) （5 月 19 日 2024 年）

- 修复已知 bug（又一个字母敲错了，万事需小心，阿门）

## [0.0.8](./ReadMe.md#args-section-get-user-start-program-params) （5 月 18 日 2024 年）

- 修改 `args` 使用 `command.args.$map` 时用户没有返回输入时返回值由 `undefined` 更改为 `{}`
- 修改 `args` 使用 `command.args` 时用户没有返回输入时返回值由 `undefined` 更改为 `[]`
- 修改 `args` 使用 `command.args.$only` 时用户没有返回输入时返回值由 `undefined` 更改为 `[]`

## [0.0.7](./ReadMe.md#args-section-get-user-start-program-params) （5 月 18 日 2024 年）

- 添加 `command` 展示项时的文本说明

## [0.0.4](./ReadMe.md#args-section-get-user-start-program-params) （5 月 18 日 2024 年）

- 维护使用字符串作为 `Args.bind` 参数时解析异常的问题

## [0.0.4](./ReadMe.md#args-section-get-user-start-program-params) （5 月 17 日 2024 年）

- 添加了 `Command` 或 `Args` 部分的结束码

## [0.0.3](./ReadMe.md#selection-section-select-mode) （5 月 16 日 2024 年）

- 添加了 `selection` 部分的属性
  - `resultText` ，可以在用户打完毕后覆盖选项部分

## [0.0.2](./ReadMe.md#question-section-qa-mode) （5 月 16 日 2024 年）

- 添加了关于 `question` 部分两个属性，
  - 一个是 `private` ，用于用户打完一个问题后可以使用下一个问题直接覆盖在上一个问题
  - 另一个是 `resultText` ，可以在用户打完毕后覆盖选项部分
- 暂不考虑添加 `default` 默认选项。后期是否添加看需求

## [0.0.1](./ReadMe.md) （4 月 28 日 2024 年）

- 初始化了这个项目
