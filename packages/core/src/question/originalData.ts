import { isArray } from 'a-type-of-js';
import { OriginalData, QuestionParamDataType } from './types';

export const originalData: OriginalData = {
  /** 该值在下面的 init 中初始化 */
  data: '',
  /** 该值在每一次 `changeCurrentIssue` 时自动更新 */
  kind: 0,
  /** 该值在下面的 init 中初始化 */
  multi: false,
  /** 该值在下面的 init 中初始化 */
  progressCount: 0,
  /** 该值在每一次绘制前根据与用户交互的结果进行给值 */
  indexOfCursor: 0,
  /** 初始化数据 */
  init: function (param: QuestionParamDataType) {
    // 初始化数据
    this.data = param;
    // 参看是单问模式还是多问模式
    this.multi = isArray(param);
  },
};
