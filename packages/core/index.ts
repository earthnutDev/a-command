import { Command } from './src/command';
import { prefixList } from './src/utils/info';

export { Args } from './src/argTool/args';

export { selection } from './src/selection/';

export type {
  SelectionParamDataType,
  SelectionParamDataMapType,
  SelectionResultType,
  SelectionParamObjectData,
  SelectionCheckDataMap,
  SelectionRadioDataMap,
  SelectionParamData,
  SelectionNoKindDataMap,
} from './src/selection/';

export { question } from './src/question/';
export type {
  QuestionParamDataType,
  QuestionReturnType,
  ValueExtendsType,
  QuestionVerify,
} from './src/question/';

export type {
  CommandPrintOption,
  ArgsItemOptionsType,
  ArgsItem,
  ArgsMapType,
  ArgsMapItemType,
  ArgsArrMapType,
  ArgsArrMapItemType,
  ArgsArrMapOptions,
  ArgsType,
} from './src/types';

export { Command };

export { prefixList as enPrefixList };
