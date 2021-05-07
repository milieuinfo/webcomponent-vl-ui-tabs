const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlTabsPage = require('./pages/vl-tabs.page');
const VlTabsBasePage = require('./pages/vl-tabs-base.page');
const VlTabsActiveTabPage = require('./pages/vl-tabs-active-tab.page');

describe('vl-tabs', async () => {
  let vlTabsPage;
  let vlTabsBasePage;
  let vlTabsActiveTabPage;

  const content1 = 'Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.';
  const content2 = 'Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const content3 = 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.';
  const content4 = 'Duis vitae magna vitae eros pretium porttitor id quis mauris. Sed imperdiet a diam in suscipit. Nunc consectetur urna nunc, eu tempor odio rutrum non. Sed in sem convallis, placerat nisi nec, placerat velit. In fringilla ex sed malesuada dictum. Sed congue neque orci, quis porta mi tempus ultrices. Vivamus gravida magna eu enim aliquet, sit amet tempus ante pellentesque. Donec eget hendrerit odio, eget aliquam felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vel maximus orci.';

  beforeEach(() => {
    const driver = getDriver();
    vlTabsPage = new VlTabsPage(driver);
    vlTabsBasePage = new VlTabsBasePage(driver);
    vlTabsActiveTabPage = new VlTabsActiveTabPage(driver);
    return vlTabsPage.load();
  });

  it('als gebruiker kan ik de verschillende tabs bekijken', async () => {
    const tabs = await vlTabsPage.getTabs();
    const tabElements = await tabs.getTabs();
    assert.lengthOf(tabElements, 3);

    await assert.eventually.equal(tabElements[0].getTitleText(), 'Trein');
    await assert.eventually.equal(tabElements[1].getTitleText(), 'Metro, tram en bus');
    await assert.eventually.equal(tabElements[2].getTitleText(), 'Fiets');
  });

  it('als gebruiker kan ik een tab met title slot en content bekijken', async () => {
    let tabs = await vlTabsPage.getSlottedTabs();
    await assert.eventually.isFalse(tabs.hasContent());

    const tabElements = await tabs.getTabs();
    await assert.eventually.equal(tabElements[0].getTitleText(), 'Auto');
    await assert.eventually.equal(tabElements[1].getTitleText(), 'Vrachtwagen');

    await tabElements[1].click();

    tabs = await vlTabsPage.getSlottedTabs();
    await assert.eventually.isTrue(tabs.hasContent());
    const tabContent = await tabs.getContentSlotElement();
    const tabContentText = await tabContent.getText();
    await assert.isTrue(tabContentText.includes(content4));
  });

  it('als gebruiker kan ik na het selecteren van een tab de tab specifieke content zien', async () => {
    const pages = [vlTabsPage, vlTabsBasePage];
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index];
      await page.load();

      let tabs = await page.getTabs();
      await assert.eventually.isFalse(tabs.hasContent());

      let tabElements = await tabs.getTabs();
      await tabElements[0].click();
      tabs = await page.getTabs();
      await assert.eventually.isTrue(tabs.hasContent());
      let tabContent = await tabs.getContentSlotElement();
      await assert.eventually.equal(tabContent.getText(), content1);

      tabElements = await tabs.getTabs();
      await tabElements[1].click();
      tabs = await page.getTabs();
      tabContent = await tabs.getContentSlotElement();
      await assert.eventually.equal(tabContent.getText(), content2);

      tabElements = await tabs.getTabs();
      await tabElements[2].click();
      tabs = await page.getTabs();
      tabContent = await tabs.getContentSlotElement();
      await assert.eventually.equal(tabContent.getText(), content3);
    }
  });

  it('als gebruiker kan ik rechtstreeks naar een URL surfen van een tab en zal deze geactiveerd worden', async () => {
    let tabs = await vlTabsPage.getTabs();
    await assert.eventually.isFalse(tabs.hasContent());

    await vlTabsPage.loadHash('#trein');
    tabs = await vlTabsPage.getTabs();
    await assert.eventually.isTrue(tabs.hasContent());
    const tabContent = await tabs.getContentSlotElement();
    await assert.eventually.equal(tabContent.getText(), content1);
  });

  it('als gebruiker zie ik het verschil tussen een alt tabs en een gewone tabs', async () => {
    const tabs = await vlTabsPage.getTabs();
    const altTabs = await vlTabsPage.getAltTabs();

    await assert.eventually.isFalse(tabs.isAlt());
    await assert.eventually.isTrue(altTabs.isAlt());
  });

  it('als gebruiker zie ik onmiddellijk de default actieve tab zijn content zonder zelf actie te moeten ondernemen', async () => {
    let tabs = await vlTabsPage.getTabs();
    let tabElements = await tabs.getTabs();
    await assert.eventually.isFalse(tabElements[0].isActive());
    await assert.eventually.isFalse(tabElements[1].isActive());
    await assert.eventually.isFalse(tabElements[2].isActive());
    await assert.eventually.isFalse(tabs.hasContent());

    await vlTabsActiveTabPage.load();
    tabs = await vlTabsActiveTabPage.getTabs();
    tabElements = await tabs.getTabs();
    await assert.eventually.isFalse(tabElements[0].isActive());
    await assert.eventually.isFalse(tabElements[1].isActive());
    await assert.eventually.isTrue(tabElements[2].isActive());
    await assert.eventually.isTrue(tabs.hasContent());
  });
});
