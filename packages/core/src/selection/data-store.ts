import { dog } from '../dog';
import { isArray, isBoolean, isString } from 'a-type-of-js';
import { DataType, SelectionParamDataType } from './types';
import { parseData } from './parseData';

/** 默认语言  */
const info = '请使用键盘选择，请使用 Enter 键选择您的选择',
  resultText = '您的选择为',
  falseValue = false,
  zeroValue = 0,
  defaultKind = 'radio';

/**  数据仓库  */
const data: DataType = {
  drawData: [],
  info,
  focus: zeroValue,
  resultText,
  private: falseValue,
  required: falseValue,
  kind: defaultKind,
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
      this.data = parseData(params);
    } else {
      Object.keys(params).forEach(currentKey => {
        const v = params[currentKey as never];
        switch (currentKey) {
          case 'data':
            this.data = isArray(v) ? parseData(v) : [];
            break;
          case 'info':
            this.info = isString(v) ? v : info;
            break;
          case 'resultText':
            this.resultText = isString(v) ? v : resultText;
            break;
          case 'private':
            this.private = isBoolean(v) ? v : falseValue;
            break;
          case 'required':
            this.required = isBoolean(v) ? v : falseValue;
            break;
          case 'kind':
            this.kind = v === 'check' ? 'check' : defaultKind;
            break;
        }
      });
    }
  },
  reset() {
    this.drawData.length = this.data.length = zeroValue;
    this.info = info;
    this.focus = zeroValue;
    this.resultText = resultText;
    this.private = falseValue;
    this.required = falseValue;
    this.kind = defaultKind;
  },
};

export { data as selectionData };
