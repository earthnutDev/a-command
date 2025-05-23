import { Args } from './argTool/args';
import { selection } from './selection/';
import { question } from './question/index';
import { OptionNameArray } from './argTool/types';

/**
 *
 *
 *
 * 这是一个集合体，继承于 `Args`，又集成了 `question` 与 `selection`
 *
 *
 */
class Command<T extends OptionNameArray> extends Args<T> {
  /**
   *
   * @param name 命令的名称
   *
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
   *
   *  })[];
   *
   *  type DataType = {
   *      // 选择要渲染的数据
   *      data:  any[];
   *      // 结果显示
   *      resultText?: string;
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
   *  @example
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
   *
   *
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
   *       //  是否必填（用户使用配置退出不保证返回值不为 undefined）
   *       required?: boolean;
   *       // 默认值，当可选时且用户未输入返值为此值
   *       defaultValue?: boolean;
   *       // 默认屏蔽了用户使用 `ctrl + c` 组合键退出，但可配置为允许。此时，返回值为 undefined
   *       canCtrlCExit?: boolean;
   *       // 默认屏蔽了用户使用 `ctrl + d` 组合键退出，但可配置为允许。此时，返回值为 undefined
   *       canCtrlDExit?: boolean;
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
   * await question
   * ```
   */
  question = question;
}

export { Command };
