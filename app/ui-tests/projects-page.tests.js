import { Selector } from 'testcafe';

fixture('Projects page').page('http://localhost:8080/');

test('Page renders', async t => {
  const mountPoint = Selector('#mount-point');

  await t.expect(mountPoint.exists).ok();
});
