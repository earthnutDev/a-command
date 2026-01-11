import { ArgsGeneralItemParadigm, Args } from './argTool';
import { CURRENT, ERROR, INFO, SUCCESS, WARN } from './info';
import { question } from './question/index';
import { selection } from './selection/';

/**
 * ## 这是一个集合体
 *
 * 继承于 `Args`，又集成了 `question` 与 `selection`及打印的一些东西
 * @deprecated **不建议使用该项，由于在仅使用一项或两项功能时，可能会无法很好的进行摇树** 计划在未来的版本移除该项
 * @deprecated 如果使用了该项的 `SUCCESS` 、 `ERROR` 、 `INFO` 、 `CURRENT` 、 `WARN` ，请直接使用函数名调用
 */
class Command<T extends ArgsGeneralItemParadigm> extends Args<T> {
  /**
   *
   * @param name 命令的名称
   * @deprecated **不建议使用该项，由于在仅使用一项或两项功能时，可能会无法很好的进行 tree shaking** 未来的版本可能会移除该项
   */
  constructor(name: string = '') {
    super(name);
    Object.defineProperties(this, {
      selection: {
        value: selection,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      question: {
        value: question,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });
  }

  /**
   *
   * ### 一个选择器
   *
   * 该应用抽离于 `selection` , 可直接 `import  { selection } form  "a-command";`
   *
   * @param data 传入需要由用户选择的数据，可以是数组或对象
   * @param resultType 可选参数
   *
   *
   * ```ts
   *  type SelectionParamDataType = (string | number | {
   *      // 值，若 label 缺省，则使用该值
   *      value: string | number;
   *      // 展示的文本
   *      label?: string | number;
   *      // 是否选中 （仅在 `kind` 值为 `check` 时有效）
   *      checked?: boolean;
   *      // 提示信息 (暂时没想好怎么用)
   *      tip: string
   *      // 是否不可用，默认值为 false，除非显式的设置为 true
   *      disable: boolean;
   *  })[];
   *
   *  type DataType = {
   *      // 选择要渲染的数据
   *      data:  any[];
   *      // 结果显示
   *      resultText?: string;
   *      // 错误展示文本，缺省时按序查找 `resultText`、`text` 文本
   *      errorText?: string;
   *      // 自定义问题文本
   *      info?:  string;
   *      // 是否为必选项
   *      required?: boolean;
   *      // 隐私模式下，用户回答将覆盖上一个问题行
   *      private?:  false | true;
   *      // 当前的选择模式 radio 为单选， check 为多选
   *      kind?: 'radio' | 'check';
   *      // 是否可以使用 `ctrl + c` 键退出 ，将返回 undefined
   *      canCtrlCExit: boolean;
   *      //  是否可以使用 `ctrl + d` 键退出
   *      canCtrlDExit: boolean;
   *      //  在允许的情况下最多可渲染的条数 (该值受最终终端的尺寸限制)
   *      maxRows: number;
   *  };
   *
   * ```
   *
   * 当数据是由一维纯字符串组成的数组时，默认使用默认配置
   *
   * 例：
   *
   *
   * ```js
   * [
   *    "汉堡",
   *   "牛排",
   *   "披萨",
   * ]
   * ```
   *
   * 当数据为 `Object` 格式时，可以自定义更多信息：
   *
   *例：
   * ```ts
   * {
   *    info: "请选择午餐吃什么",  //自定义提示文字信息
   *    resultText？: "您选择的结果是 ",  // 结果显示
   *    private: true,  // 不显示结果
   *    data: [] //由字符串组成的数组
   * }
   *
   *```
   * @example
   *  导出一个显示的列表选择.
   *
   * 当 data 为一维纯字符串组成的数组时，则默认使用默认的配置.
   *      例:
   *        ```ts
   *          [
   *                 "烧饼",
   *                 "板面",
   *                 "油泼面",
   *           ]
   *          ```
   *
   * 当 data 为 `Object` 格式时，可以自定义更多信息：
   * @example
   *
   * ```ts
   * {
   *    info       : "请选择中午吃什么",   // 自定义提示文本信息
   *    resultText : "你想吃的是"         // 结果展示
   *    private    : true ,             // 不展示结果
   *    data       :[]                  //  字符串组成的数组
   * }
   *
   * ```
   */
  selection = selection;

  /**
   *
   * ### 一个向提问的并收集用户答录
   *
   * 该应用抽离于 `question` , 可直接 `import  { question } form  "a-command";`
   *
   * ```ts
   *
   * type ParamDataType = {
   *        text: string;
   *        // 用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
   *        tip?: string | number | never | Boolean | null | undefined | any[] ;
   *        //  类型，仅支持文本（text）和密码（password），缺省为文本
   *        type?: "text" | "password";
   *        //   隐私模式
   *       private: false;
   *        //  结果展示
   *       resultText: string;
   *        //  错误展示
   *       errorText: string;
   *       //  是否必填（用户使用配置退出不保证返回值不为 undefined）
   *       required?: boolean;
   *       // 默认值，当可选时且用户未输入返值为此值
   *       defaultValue?: boolean;
   *       // 默认屏蔽了用户使用 `ctrl + c` 组合键退出，但可配置为允许。此时，返回值为 undefined
   *       canCtrlCExit?: boolean;
   *       // 默认屏蔽了用户使用 `ctrl + d` 组合键退出，但可配置为允许。此时，返回值为 undefined
   *       canCtrlDExit?: boolean;
   *       // 设定长度强制限定，优先级高于 `minLen`、`maxLen` 而低于 `verify`
   *       len?: number;
   *       // 设定最小字符数，优先级仅高于  `maxLen`
   *       minLen?: number;
   *       // 设定最长字符数，优先级最低，通过该值将触发返回
   *       maxLen?: number;
   *       // 正则校验
   *       verify?: {
   *         // 正则 （该正则验证为）
   *         reg: RegExp;
   *         // 未通过时提示信息
   *         info: string
   *         // 取反
   *         inverse?: boolean;
   *         // 仅作提示，不作为最后的提交强验证
   *         warn?: boolean
   *       }[]
   *  }
   *
   * ```
   * @param data     参数，可以是 string、ParamDataType 或是他们组成的数组
   * @param  simpleResult   是否显示为简单模式的返回（默认返回是答案与），缺省为 false
   * @example
   *
   * ```ts
   * import { question } from 'a-command';
   *
   * // 最小配置
   * await question('吃了么')
   *
   * // 多问默认
   * await question(['姓名', '性别' ,'年龄']);
   *
   * // 全配置模式
   * await question({
   *    text: '请输入您最爱吃的一种食物',
   *    tip : '只能输入吃的呦',
   *    required: true, // 该项必须输入（当 `len`、`minLen` 大于 0 时将同样限制字符数）
   *    type: 'text',  // 文本输入默认，另可选 `password`
   *    private: true, // 不打印默认结果行
   *    errorText: '您选择了退出，祝您好运', // 用户书用设定退出方式退出
   *    resultText: '原来你喜欢吃', // 结果展示
   *    defaultValue: '西瓜', // 默认值，当有值时，且值混乱时可能不可用
   *    canCtrlCExit: true, // 允许用于使用 `Ctrl + C` 退出
   *    canCtrlDExit: true, // 允许用于使用 `Ctrl + D` 退出
   *    len: 5, // 限制用户输出长度为 5， 该值优先级高于 `minLen`、`maxLen`，却低于 `verify` 校验
   *    minLen: 5, // 限制用户输入长度不低于 5，优先级高于 `maxLen`
   *    maxLen: 5, // 限制用户输入长度不超过 5，校验优先级最低
   *    verify: [{
   *       reg: /^[a-z]+$/, // 限制用户输入仅为 `a-z` 小写英文字符
   *       info: '您仅可输入英文小写字符', // 该校验不通过的提示信息
   *    }, {
   *       reg: /^.{5}$/, // 限制字符数为 5
   *       info: '您输入长度仅可为 5'
   *    }, {
   *        ref: /$jerry^/,
   *        info: '不可以设置成 jerry 呦',
   *        inverse: true
   *    },{
   *      ref: /$ginny^/i,
   *      info: '严格来说设置这个不好，但是也是允许的',
   *      inverse: true,
   *      warn: true
   *    }]
   * });
   * // 在上面的示例中，触发检验流程为：
   * // required > verify > len > minLen > maxLen
   * ```
   * ```
   */
  question = question;

  /**
   *  提示信息
   *
   *  * 默认为绿色的 <span style="color:#2ceeec;">✦</span>
   *
   */
  INFO = INFO;
  /**
   * 完成
   * @param message 展示的文本
   * @param [prefix='⚉'] 展示的前缀，默认为绿色的 <span style="color:#2fe81a;">❖</span>
   * @returns void
   */
  SUCCESS = SUCCESS;
  /**
   * 当前项
   *
   * 默认为黄色的 <span style="color:#e8ec14;">▶︎</span>
   */
  CURRENT = CURRENT;
  /**
   *  警示
   *
   * 默认为洋红色的 <span style="color:#fb00fa;">◼︎</span>
   *
   */
  WARN = WARN;

  /**
   * 错误信息展示
   * @param message 展示的文本
   * @param [prefix='⚉'] 展示的前缀，默认为红色的 <span style="color:#fc2119;">⚉</span>
   * @returns void
   */
  ERROR = ERROR;
}

export { Command };
