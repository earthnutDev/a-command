/** 参数数据对象型类型  **/
export type SelectionParamDataMapType = {
  /**
   *
   * 要渲染的选择的数据数据
   ***/
  data: (string | number)[];
  /**
   *
   * 提问信息
   **/
  info?: string | number;
  /**
   *
   * 是否展示选择预览
   **/
  showPreview?: boolean;
  /**
   *
   * 选择预览
   **/
  preview?: string | number;
  /**
   *
   *  结果展示文本（缺省则以 `info`  为准）
   **/
  resultText?: string | number;
  /**
   *
   * 私密模式
   **/
  private?: boolean;
};

/**
 *
 * *参数数据类型*
 ***/
export type SelectionParamDataType =
  | (string | number)[]
  | SelectionParamDataMapType;
