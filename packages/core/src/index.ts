import { Command } from './command';
import { prefixList } from './utils/info';

export { Args } from './argTool/args';

export { selection } from './selection';

export type {
  SelectionParamDataType,
  SelectionParamDataMapType,
  SelectionResultType,
  SelectionParamObjectData,
  SelectionCheckDataMap,
  SelectionRadioDataMap,
  SelectionParamData,
  SelectionNoKindDataMap,
} from './selection';

export { question } from './question';

export type {
  QuestionParamDataType,
  QuestionReturnType,
  ValueExtendsType,
  QuestionVerify,
} from './question';

export type { CommandPrintOption } from './utils/types';

export { Command };

export { prefixList as enPrefixList };
