const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlTabsPage = require('./pages/vl-tabs.page');

describe('vl-tabs', async () => {
  let vlTabsPage;

  before(() => {
    vlTabsPage = new VlTabsPage(getDriver());
    return vlTabsPage.load();
  });

  it('als gebruiker kan ik de verschillende tabs bekijken', async () => {
    const tabs = await vlTabsPage.getTabs();
    const tabElements = await tabs.getTabs();
    assert.lengthOf(tabElements, 3);
    await assert.eventually.equal(tabElements[0].getText(), 'Trein');
    await assert.eventually.equal(tabElements[1].getText(), 'Metro, tram en bus');
    await assert.eventually.equal(tabElements[2].getText(), 'Fiets');
  });
});
