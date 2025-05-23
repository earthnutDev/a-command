/**  详细单子项必须参数  */
export type SelectionDataRequired = {
  /**  值（若 label 缺省，将使用本值）  */
  value: string | number;
};

/**  详细单子项可选配置参数  */
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

/** 必须的参数 */
export type RequiredAttributes = {
  /** 要渲染的选择的数据数据 */
  data: SelectionParamData;
};
/** 可选的参数 */
export type OptionalAttributes = {
  /** 提问信息 */
  info: string | number;
  /**  结果展示文本（缺省则以 `info`  为准） **/
  resultText: string | number;
  /**   是否是必填项 */
  required: boolean;
  /** 私密模式 */
  private: boolean;
  /**  类型 */
  kind: 'radio' | 'check';
  /**  是否可以使用 `ctrl + c` 键退出 */
  canCtrlCExit: boolean;
  /**  是否可以使用 `ctrl + d` 键退出 */
  canCtrlDExit: boolean;
  /**  终端行数变化时  */
  /**  在允许的情况下最多可渲染的条数 (该值受最终终端的尺寸限制) */
  maxRows: number;
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
  /**  是否展示  */
  show: boolean;
};

/**  绘制的实际数据  */
export type DrawData = DrawDataItem[];

/**
 *
 * 使用数据
 *
 */
export type DataType = OptionalAttributes & {
  // 下面的属性仅会出现在内部逻辑中使用
  /**  使用数据（在 initData 中进行了解析 ）  */
  data: SelectionUseData[];
  /**  当前选择项  */
  focus: number;
  /**  最终绘制的数据 */
  drawData: DrawData;
  /**  实际渲染的信息 */
  renderInfo: {
    /**
     *
     * 渲染行数
     *
     * = renderRows + otherInfoRows
     */
    rows: number;
    /**
     *
     * 渲染问题行数
     *
     * = rows  - otherInfoRows
     */
    renderRows: number;
    /**
     * 其他信息的高度
     *
     * = rows - renderRows
     */
    otherInfoRows: number;
    /**
     *
     * 允许下端渲染空白
     *
     *
     * 在 rows 值大于 7 是该值为 true ，否则该值为 false ，为了保证 renderRows 值不小于 3
     */
    allowBelow: boolean;
    /**  当前终端的尺寸  */
    size: {
      /**  终端的宽 （process.stdout.columns） */
      width: number;
      /**  终端的高 （process.stdout.rows）  */
      height: number;
    };
  };
  /**  展示必须的文本信息  */
  mustInfo: boolean;
  /** 将给订参数放进这里 */
  initData: (_data: SelectionParamDataType) => void;
  /**  重置  */
  reset: () => void;
};

/**  返回值  */
export type SelectionResultType<
  T extends SelectionParamDataType,
  U extends 'string' | 'number' | undefined,
> = T extends SelectionParamData
  ? U extends 'string' | undefined
    ? string | undefined
    : number | undefined
  : T extends { kind: 'check' }
    ? U extends 'string' | undefined
      ? string[] | undefined
      : number[] | undefined
    : U extends 'string' | undefined
      ? string | undefined
      : number | undefined;
