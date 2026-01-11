/**
 * @packageDocumentation
 * @module  a-command
 * @file index.ts
 * @description a-command 根
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright  2026 ©️ MrMudBean
 * @since 2026-01-11 23:59
 * @version 3.0.0
 * @lastModified 2026-01-12 00:39
 */
export { Command } from './command';

export { Args } from './argTool/index';

export type {
  ArgsArrMap,
  ArgsArrMapItem,
  ArgsArrMapItemType,
  ArgsArrMapOptions,
  ArgsArrMapType,
  ArgsGeneralItemParadigm,
  ArgsItemOptions,
  ArgsItemOptionsType,
  ArgsMap,
  ArgsMapItem,
  ArgsMapItemType,
  ArgsMapType,
  ArgsType,
  OptionNameArray,
} from './argTool/index';

export { selection } from './selection';

export type {
  SelectionCheckDataMap,
  SelectionNoKindDataMap,
  SelectionParamData,
  SelectionParamDataMapType,
  SelectionParamDataType,
  SelectionParamObjectData,
  SelectionRadioDataMap,
  SelectionResultType,
} from './selection';

export { question } from './question';

export type {
  QuestionParamData,
  QuestionParamDataType,
  QuestionReturn,
  QuestionReturnType,
  QuestionVerify,
} from './question';

export { CURRENT, ERROR, INFO, prefixList, SUCCESS, WARN } from './info';
export type { CommandPrintOption, PrintOption } from './info';
