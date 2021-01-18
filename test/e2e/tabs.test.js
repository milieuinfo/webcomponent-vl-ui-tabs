const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlTabsPage = require('./pages/vl-tabs.page');

describe('vl-tabs', async () => {
  let vlTabsPage;

  before(() => {
    vlTabsPage = new VlTabsPage(getDriver());
    return vlTabsPage.load();
  });

  it('', async () => {
    assert.isTrue(true);
  });
});
