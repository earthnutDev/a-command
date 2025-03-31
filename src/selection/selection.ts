import commandData from 'src/commandData';
import { SelectionParamDataType } from './types';
import origin_selection from './originSelection';

/**
 *
 * ```ts
 *  type SelectionParamDataType = any[] | type;
 *
 *  type DataType = {
 *      data:  any[];  // 选择要渲染的数据
 *      resultText: string;  // 结果显示
 *      info？:  string;  // 自定义信息
 *      showPreview？:  boolean;  // 是否显示答案预览
 *      preview？:  string; // 选择时预览
 *      private？:  false | true; 隐私模式下，用户回答将覆盖上一个问题行
 *  };
 *
 * ```
 * @param data 传入需要由用户选择的数据，可以是数组或对象
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
 *    showPreview: true,  //是否要提示选择结果
 *    preview: "Currently selected as", // 选择时预览
 *    private: true,  // 不显示结果
 *    data: [] //由字符串组成的数组
 * }
 *
 *```
 *
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
 *  当 data 为 `Object` 格式时，可以自定义更多信息：
 *      例：
 *
 *  ```ts
 *     {
 *              info       : "请选择中午吃什么",   // 自定义提示文本信息
 *              resultText : "你想吃的是"         // 结果展示
 *              showPreview:true ,              //  是否提示已选结果
 *              preview    : "当前选择为",       //  选择时预览
 *              private    : true ,             // 不展示结果
 *              data       :[]                  //  字符串组成的数组
 *          }
 *
 *  ```
 */
export default function selection(
  data: SelectionParamDataType,
  resultType?: 'number' | 'string',
): Promise<string | number> {
  /**
   * 返回一个 promise
   */
  return new Promise((resolve, reject) => {
    /**
     * 注册数据到数据仓中，保证每一个注册的 selection 数据都是独立的
     */
    commandData.on(Symbol('selection'), async () => {
      try {
        /**
         * 使用原始定义的 selection 方法执行并返回结果
         */
        const result = await origin_selection(data, resultType);

        commandData.remove(); // 执行下一个 selection
        resolve(result);
      } catch {
        commandData.remove(); // 执行下一个 selection
        reject();
      }
    });
  });
}
