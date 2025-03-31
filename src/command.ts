import Args from './argTool/args';
import selection from './selection/selection';
import question from './question/question';

/**
 *
 *
 *
 * 这是一个集合体，继承于 `Args`，又集成了 `question` 与 `selection`
 *
 *
 * 但是，建议使用 `Command` 而不是 `question` 或 `selection`
 *
 * 因为 `Command` 会自动管理调用的顺序 ，这看个人使用习惯
 *
 */
class Command extends Args {
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
   * 该应用抽离于 `selection` , 可直接 `import  { selection } form  "a-command";`
   *
   * @example
   *
   * ```ts
   * type DataType = {
   *   data: any[], //  Selected data to be rendered
   *   resultText:string,  //  Result display
   *   info?: string,  //  Questioning information
   *   showPreview?: boolean,  //  Is the answer preview displayed
   *   preview?: string //  Preview on selection
   *   };
   *
   *  type ParamType = (string | DataType)[]
   *
   * ```
   *
   *
   *
   */
  selection = selection;

  /**
   *
   * 该应用抽离于 `question` , 可直接 `import  { question } form  "a-command";`
   *
   *
   * @example
   *
   * ```ts
   * ParamDataType = {
   *       text: string,
   *      // User prompt: When it is pure text, display as text prompt; When it is an array, it defaults to selective questioning
   *     tip?: string | number | never | Boolean | null | undefined | any[],
   *     // Type, only supports text and password，default  is text
   *     type?: "text" | "password"
   *               // Privacy mode, user answers will overwrite the previous question line
   *     private: false,
   *     // Result display
   *      resultText: "",
   * }
   *
   * type ParamType = (ParamDataType | string)[] | ParamDataType | string
   *
   * ```
   *
   *
   *
   * */

  question = question;

  /**
   * 主动抛出一个错误终止进程
   */
  get error() {
    process.exit(1);
    return true;
  }
}

export default Command;
