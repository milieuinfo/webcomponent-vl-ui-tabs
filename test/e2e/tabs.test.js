const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlTabsPage = require('./pages/vl-tabs.page');

describe('vl-tabs', async () => {
  let vlTabsPage;
  const content1 = 'Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.';
  const content2 = 'Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const content3 = 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.';

  beforeEach(() => {
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

  it('als gebruiker kan ik na het selecteren van een tab de tab specifieke content zien', async () => {
    let tabs = await vlTabsPage.getTabs();
    await assert.eventually.isFalse(tabs.hasContent());

    let tabElements = await tabs.getTabs();
    await tabElements[0].click();
    tabs = await vlTabsPage.getTabs();
    await assert.eventually.isTrue(tabs.hasContent());
    let tabContent = await tabs.getContentSlotElement();
    await assert.eventually.equal(tabContent.getText(), content1);

    tabElements = await tabs.getTabs();
    await tabElements[1].click();
    tabs = await vlTabsPage.getTabs();
    tabContent = await tabs.getContentSlotElement();
    await assert.eventually.equal(tabContent.getText(), content2);

    tabElements = await tabs.getTabs();
    await tabElements[2].click();
    tabs = await vlTabsPage.getTabs();
    tabContent = await tabs.getContentSlotElement();
    await assert.eventually.equal(tabContent.getText(), content3);
  });

  it('als gebruiker kan ik rechtstreeks naar een URL surfen van een tab en zal deze geactiveerd worden', async () => {
    let tabs = await vlTabsPage.getTabs();
    await assert.eventually.isFalse(tabs.hasContent());

    await vlTabsPage.loadHash('#trein');
    tabs = await vlTabsPage.getTabs();
    await assert.eventually.isTrue(tabs.hasContent()); const tabContent = await tabs.getContentSlotElement();
    await assert.eventually.equal(tabContent.getText(), content1);
  });

  it('als gebruiker zie ik het verschil tussen een alt tabs en een gewone tabs', async () => {
    const tabs = await vlTabsPage.getTabs();
    const altTabs = await vlTabsPage.getAltTabs();

    await assert.eventually.isFalse(tabs.isAlt());
    await assert.eventually.isTrue(altTabs.isAlt());
  });
});
