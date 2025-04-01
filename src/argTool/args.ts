import { initializeFile } from 'a-node-tools';
import { ArgsType, BindParamsType, StateType } from './types';
import { auxiliaryDataStore, createAuxiliaryData } from './auxiliaryData';
import bindInstruction from './bindInstructions';
import executeParsing from './executeParsing';
import { organizeHelpInformation } from './organizeHelpInformation';
import showVersion from './showVersion';

/**   
 
 *
 *  解析用户的输入参数
 *  可接受用用操作
 *  - `commandName argName`
 *  - `commandName argName value`
 *  - `commandName argName optionName`
 *  - `commandName argName optionName value`
 *    **_调用 `run` 后才会开始工作，并且，请在执行 `run` 之前完成所有操作的绑定_**
 * 示例：
 *    倘若你的执行前缀为 `gig` , 可用：
 *    _当你有多个配置项时，可把符合规则的配置项放入数组_
 *    **使用字符串参数时，注意 `<>` 和 `()` 均为英文符号**
 *  - 最简单的例子
 *      ```js
 *        import { Args }  from "a-command";
 *        const  command : Args =  new Args();
 *        command.bind("init <-i> (初始化一个配置文件)").run();
 *      ```
 * - 不带子项的配置
 *
 *      ```js
 *        import { Args }  from "a-command";
 *        const  command : Args =  new Args();
 *        command.bind({
 *                      name: "init",
 *                      abbr: "-i",
 *                      info: "初始化一个配置文件",
 *                     }).run();
 *      ```
 *  - 带子项配置（子项纯文本的）
 *      ```js
 *        import { Args }  from "a-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "初始化一个配置文件",
 *              options: [
 *                      "ts <-t> (初始化一个 `ts` 后缀配置文件)",
 *                      "js <-j> (初始化一个 `js` 后缀配置文件)",
 *                      "json <-o> (初始化一个 `json` 后缀配置文件)",
 *                       ]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 *  - 全配置的
 *      ```js
 *        import { Args }  from "a-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "初始化一个配置文件",
 *              options: [{
 *                          name:"ts",
 *                          abbr: "-t",
 *                          info: "初始化一个 `ts` 后缀配置文件"
 *                        },{
 *                          name:"js",
 *                          abbr: "-j",
 *                          info: "初始化一个 `js` 后缀配置文件"
 *
 *                        },{
 *                          name:"json",
 *                          abbr: "-o",
 *                          info: "初始化一个 `json` 后缀配置文件"
 *                        }]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 */
class Args {
  // 为一只
  uniKey: symbol;
  /**
   * 初始化的参数用于指定是否在有重复的指令时是否覆盖，默认不覆盖
   */
  constructor(name: string = '') {
    if (typeof name !== 'string') name = `${name}`;
    this.uniKey = Symbol(name);
    if (auxiliaryDataStore[this.uniKey])
      throw new Error(
        `${name} 已经存在，请更换初始化命令名称，若仍想在原命令上操作，请抽离为单独的文件做数据共享`,
      );

    // 初始化数据
    auxiliaryDataStore[this.uniKey] = createAuxiliaryData();
    // 初始化文件路径
    [auxiliaryDataStore[this.uniKey].__filename] = initializeFile();
    auxiliaryDataStore[this.uniKey].name =
      name ||
      (typeof process.argv[1] == 'string' &&
        process.argv.slice(1, 2)[0].replace(/.*\/.*?$/, '$1')) ||
      '';
    /** 禁止修改唯一值 */
    Object.defineProperty(this, 'uniKey', {
      value: this.uniKey,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  /**
   *
   * 命令名称
   */
  get name(): string {
    return auxiliaryDataStore[this.uniKey].name;
  }

  /**
   *  当前状态
   *  - 1 `start`  刚开始，等待绑定
   *  - 2 `bind over`  执行绑定，等待执行
   *  - 3  `run over`  解析完毕
   *  - 4 `over` 执行完毕，不建议在此命令后进行任何操作
   *
   */
  get state(): StateType {
    return auxiliaryDataStore[this.uniKey].state;
  }

  /**
   *
   *  是否已结束
   *
   *  调用会返回一个布尔值 ，布尔值上有一个属性 `end` 可以直接终止当前进程
   */
  get isEnd() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    /**
     *
     *
     *
     */
    class My extends Boolean {
      /**
       *
       *
       *
       */
      constructor() {
        super(auxiliaryDataStore[_this.uniKey].state.code == 4);
      }
      /**
       *
       * 倘若 isEnd 返回的是 true ，证明用户使用 -v 、-h 。默认回去展示它们
       *
       * 此时若无其他操作，建议 end 一下
       *
       */
      get end(): true {
        if (this.valueOf()) {
          return _this.end;
        }
        return true;
      }
    }

    return new My();
  }

  /**
   *  直接结束当前进程
   *
   *  这是一个属性
   */
  get end(): never {
    return process.exit();
  }

  /**
   *
   * 以🙅终止当前进程，该终结将导致后续 npm 的终结
   *
   *
   */
  get error(): never {
    return process.exit(1);
  }

  /**
   * 绑定选项、说明及缩写
   *
   *
   * @param data {@link BindParamsType}   Binding Command Line Parameter
   *
   *        data {@link BindParamsType}  绑定命令行参数
   */
  bind(data: BindParamsType) {
    bindInstruction(data, auxiliaryDataStore[this.uniKey]);
    return this;
  }

  /**
   * 开始执行回调
   */
  run() {
    /** 由于怕数据污染，用户若使用多 args，这可能会导致该问题的出现。所以所有的数据保持单一 */
    executeParsing(auxiliaryDataStore[this.uniKey]);
    return this;
  }

  /**
   *
   * 获取有序的参数\
   * *这些值是经过 `bind` 绑定的值，其他直接作用于顶级的值请使用 `this.values` 调用*
   *
   * 是一个继承于 {@link Array} 的对象，有属性
   *
   * - $map      返回的是对象模式，用于配置文件比较好
   * - $arrMap   以 $map 对象作为元素的数组, 适合有顺序的参数调用用
   * - $only     仅包含头部的字符串数组
   * - $original 原始的参数
   * - $isVoid   是否为空
   *
   */
  get args(): ArgsType {
    return auxiliaryDataStore[this.uniKey].args;
  }

  /**
   *
   * 该值为 `this.args` 的补充使用\
   * 当值通过 `bind`  绑定并解析时，其解析值是与 `bind` 相对应的\
   * 这就导致简单的应用想直接将参数传入而无法接收\
   * （无法通过该方法，无法通过该方法直接使用，还需要从 `process.argv` 中解析）\
   * 这实际上已经失去了封装便利性的优势，所以，使用该属性进行补充
   *
   * *现亦可通过 `this.args.$nomatch` 来获取相同的值*
   *
   */
  get values(): (string | number | boolean)[] {
    return auxiliaryDataStore[this.uniKey].values.slice();
  }

  /**
   *
   * 用户可主动调用该方法在用户参数没有包含 -h 的时候展示帮助文档
   *
   * @param  optionName  调用的一级展示
   * @param  subOptionName 调用的二级（一级的子项）
   * @memberof Args
   */
  help(optionName?: string, subOptionName?: string) {
    const _auxiliaryData = auxiliaryDataStore[this.uniKey];
    if (
      typeof optionName == 'string' &&
      _auxiliaryData.originalBind[optionName]
    ) {
      if (
        typeof subOptionName == 'string' &&
        _auxiliaryData.originalBind[optionName].options &&
        _auxiliaryData.originalBind[optionName].options[subOptionName]
      )
        _auxiliaryData.helpInfo = [optionName, subOptionName];
      else _auxiliaryData.helpInfo = optionName;
    } else _auxiliaryData.helpInfo = 'help';
    organizeHelpInformation(auxiliaryDataStore[this.uniKey]);
  }

  /**
   * 主动展示版本信息
   *
   *
   * @memberof Args
   */
  version() {
    showVersion(auxiliaryDataStore[this.uniKey]);
  }
}

export default Args;
