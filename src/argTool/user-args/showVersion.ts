/**
 * Display current version
 *
 * 展示当前版本
 */

import {
  _p,
  fileExist,
  getDirectoryBy,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { arch, hostname } from 'node:os';
import { AuxiliaryData } from '../data-store/auxiliaryData';
import pen from 'color-pen';
import { isUndefined } from 'a-type-of-js';

/**
 *
 * 当主动触发或是用户输入 `version/-v`  时触发
 *
 */
export default function showVersion(auxiliaryData: AuxiliaryData): void {
  auxiliaryData.state = 'version';

  // 目标文件位置
  const targetFileBaseName = getDirectoryBy('package.json', 'file');

  // 未找到 package.json 文件的上级目录
  if (isUndefined(targetFileBaseName)) {
    return noFoundVersion();
  }
  /**  package.json 文件的路径  */
  const packageJsonPath = pathJoin(targetFileBaseName, 'package.json');

  if (!fileExist(packageJsonPath)) {
    return noFoundVersion();
  }
  /** 抓取 package.json 文件的内容 */
  const json = readFileToJsonSync(packageJsonPath);
  //  文件没有配置名称及当前版本号
  if (!json.name && !json.version) {
    return noFoundVersion();
  }
  const { platform } = process;

  _p(
    `您好，${pen.random(hostname())}：应用 (${pen.yellow(
      json.name,
    )}) 的当前版本为 ${pen.red(json.version)} for ${platform == 'win32' ? 'Windows' : platform == 'darwin' ? 'mac' : platform} ${pen.brightMagenta(arch())}`,
  );
}

/**   未找到版本定义说明  */
function noFoundVersion(): void {
  _p('抱歉，未找到版本定义说明');
}
