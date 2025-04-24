/**
 * Display current version
 *
 * 展示当前版本
 */

import {
  _p,
  fileExist,
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { arch } from 'node:os';
import { AuxiliaryData } from './auxiliaryData';
import pen from 'color-pen';
import { isNull, isUndefined } from 'a-type-of-js';

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
  const json = readFileToJsonSync<PackageJson>(packageJsonPath);
  //  文件没有配置名称及当前版本号
  if (isNull(json)) {
    return noFoundVersion();
  }
  const { platform } = process;

  const pkgName = pen.brightCyan(json.name);
  const version = json.version;
  const machine =
    platform == 'win32' ? 'Windows' : platform == 'darwin' ? 'mac' : platform;
  const system = pen.brightMagenta(arch());

  _p(`${pkgName} 版本 ${pen.brightRed(version)} (${machine} ${system})`);
}

/**   未找到版本定义说明  */
function noFoundVersion(): void {
  _p('抱歉，未找到版本定义说明');
}
