import { Selector } from 'testcafe';

fixture('Notifications page').page('http://localhost:8080/notifications');

test('Page renders', async t => {
  const mountPoint = Selector('#mount-point');

  await t.expect(mountPoint.exists).ok();
});
