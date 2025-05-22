import { prefixList } from './../src/utils/info';
import { dev } from '@qqi/dev-log';

dev.skip('查看效果', it => {
  it('测试不同等级的将直接执行', () => {
    Object.keys(prefixList).forEach(e => {
      console.log(`${e} :`, prefixList[e as 'info']());
    });
    // _p(`${esc}c`, false);
  });
});
