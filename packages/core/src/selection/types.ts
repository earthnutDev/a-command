export type SelectionDataRequired = {
  /**  值（若 label 缺省，将使用本值）  */
  value: string | number;
};

export type SelectionDataOption = {
  /**  标签  */
  label: string | number;
  /**  当前是否被选中  */
  checked: boolean;
  /**  提示信息  */
  tip: string;
};

/**  使用 data 值  */
export type SelectionUseData = SelectionDataRequired & SelectionDataOption;
/**  参数 data 值  */
export type SelectionParamData = (
  | string
  | number
  | (SelectionDataRequired & {
      [x in keyof SelectionDataOption]?: SelectionDataOption[x];
    })
)[];

/**
 * 必须的参数
 */
export type RequiredAttributes = {
  /**
   *
   * 要渲染的选择的数据数据
   */
  data: SelectionParamData;
};
/**
 * 可选的参数
 */
export type OptionalAttributes = {
  /**
   *
   * 提问信息
   **/
  info: string | number;
  /**
   *
   *  结果展示文本（缺省则以 `info`  为准）
   **/
  resultText: string | number;
  /**
   *
   * 是否是必填项
   *
   */
  required: boolean;
  /**
   *
   * 私密模式
   **/
  private: boolean;
  /**
   * 类型
   */
  kind: 'radio' | 'check';
};

/** 参数数据对象型类型  **/
export type SelectionParamDataMapType = RequiredAttributes & {
  [x in keyof OptionalAttributes]?: OptionalAttributes[x];
};

/**
 *
 * *参数数据类型*
 *
 */
export type SelectionParamDataType =
  | SelectionParamData
  | SelectionParamDataMapType;

/**  绘制的数据单项  */
export type DrawDataItem = {
  /** 文本  */
  text: string;
  /**  占终端长度  */
  length: number;
  /**  是否为焦点项  */
  focus: boolean;
  /**  是否为选中项  */
  checked: boolean;
  /**  是否发生了比变更  */
  changed: boolean;
  /**  当前的下标  */
  index: number;
};

/**  绘制的实际数据  */
export type DrawData = DrawDataItem[];

export type DataType = { data: SelectionUseData[] } & OptionalAttributes & {
    /**  当前选择项  */
    focus: number;
    /**  最终绘制的数据 */
    drawData: DrawData;
    /** 将给订参数放进这里 */
    initData: (_data: SelectionParamDataType) => void;
    /**  重置  */
    reset: () => void;
  };
