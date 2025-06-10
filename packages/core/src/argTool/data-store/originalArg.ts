/****************************************************************************
 *  @Author earthnut
 *  @Email earthnut.dev@outlook.com
 *  @ProjectName a-command
 *  @FileName originalArg.ts
 *  @CreateDate  周三  04/09/2025
 *  @Description 原始的用户输入的参数数组，防止用户自己不小心修改而做备份
 ****************************************************************************/
/** 原始的用户输入的参数数组 */
const originalArg: string[] = process.argv.slice(2);

export { originalArg };
// 📊🥶🕳️
Object.freeze(originalArg);
