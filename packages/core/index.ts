import { Command } from './src/command';

export { Args } from './src/argTool/args';

export * as ArgsTypes from './src/argTool/types';

export { selection } from './src/selection/';
export type {
  SelectionParamDataType,
  SelectionParamDataMapType,
  SelectionResultType,
} from './src/selection/';

export { question } from './src/question/';
export type {
  QuestionParamDataType,
  QuestionReturnType,
} from './src/question/';

export { Command };
export default Command;
