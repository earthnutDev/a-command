/**  获取默认的最大的行数支持  */
export function getMaxRows(withSpace: boolean = true) {
  return process.stdout.rows - 4 * (1 + Number(withSpace));
}
