import { dog } from '../dog';
import { isArray } from 'a-type-of-js';
import { SelectionParamDataMapType, SelectionParamDataType } from './types';

/** 默认语言  */
export const info = '请使用键盘选择，请使用 Enter 键选择您的选择',
  resultText = '您的选择为',
  showPreview = false,
  privateValue = false,
  preview = '当前选择为 ';
const data: DataType = {
  drawData: [],
  info,
  select: 0,
  showPreview,
  resultText,
  preview,
  private: privateValue,
  data: [],
  initData(params: SelectionParamDataType) {
    dog('初始化数据');
    // 清理旧的数据
    this.reset();
    /**
     * 使用参数为 `string` 或 `number` 的数组时
     *
     * `data` 使用参数，而其他值
     */
    if (isArray(params)) {
      this.data = [...params] as (string | number)[];
    } else {
      Object.keys(params).forEach(currentKey => {
        switch (currentKey) {
          case 'data':
            this.data = [...params[currentKey]] as (string | number)[];
            break;
          case 'info':
            this.info = params[currentKey];
            break;
          case 'showPreview':
            this.showPreview = params[currentKey] !== false;
            break;
          case 'resultText':
            this.resultText = params[currentKey];
            break;
          case 'preview':
            this.preview = params[currentKey];
            this.showPreview = true;
            break;
          case 'private':
            this.private = params[currentKey];
            break;
        }
      });
    }
  },
  reset() {
    this.drawData.length = this.data.length = 0;
    this.info = info;
    this.select = 0;
    this.showPreview = showPreview;
    this.resultText = resultText;
    this.preview = preview;
    this.private = privateValue;
  },
};

/**
 *
 * 数据类型
 **/
type DataType = SelectionParamDataMapType & {
  /**  当前选择项  */
  select: number;
  /**  最终绘制的数据 */
  drawData: (string | undefined)[];
  /** 将给订参数放进这里 */
  initData: (_data: SelectionParamDataType) => void;
  reset: () => void;
};

export { data as selectionData };
