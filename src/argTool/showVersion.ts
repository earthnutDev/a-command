/**
 * Display current version
 *
 * 展示当前版本
 */

import {
  _p,
  fileExist,
  getCallerFilename,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { arch, hostname } from 'node:os';
import { AuxiliaryData } from './auxiliaryData';
import pen from 'color-pen';

/**
 *
 *
 *
 */
export default function showVersion(auxiliaryData: AuxiliaryData): void {
  auxiliaryData.state = 4;
  // 目标文件位置
  let targetFilename = pathJoin(
    getCallerFilename(auxiliaryData.__filename),
    '..',
  );

  /** 查找到对应的 package.json 文件 */
  while (fileExist(targetFilename)) {
    //  查找到 package.json 文件目录
    if (fileExist(pathJoin(targetFilename, 'package.json'))) {
      targetFilename = pathJoin(targetFilename, 'package.json');
      break;
    }
    const nestFilename = pathJoin(targetFilename, '..');
    // 未找到
    if (targetFilename == nestFilename) break;
    targetFilename = nestFilename;
  }
  /** 抓取 package.json 文件的内容 */
  const json = readFileToJsonSync(targetFilename);
  /*** 文件没有配置名称及当前版本号 */
  if (!json.name && !json.version) {
    _p('抱歉，未找到版本定义说明');
    return;
  }
  const { platform } = process;
  _p(
    `您好，${pen.random(hostname())}：应用 (${pen.yellow(
      json.name,
    )}) 的当前版本为 ${pen.red(json.version)} for ${platform == 'win32' ? 'Windows' : platform == 'darwin' ? 'mac' : platform} ${pen.brightMagenta(arch())}`,
  );
}
