const VlTabs = require('../components/vl-tabs');
const {Page, Config} = require('vl-ui-core').Test;

class VlTabsPage extends Page {
  async getTabs() {
    return this._getTabs('#tabs');
  }

  async getSlottedTabs() {
    return this._getTabs('#tabs-slotted');
  }

  async getAltTabs() {
    return this._getTabs('#tabs-alt');
  }

  async getActiveTabTabs() {
    return this._getTabs('#tabs-active-tab');
  }

  async load(url) {
    await super.load(url || Config.baseUrl + '/demo/vl-tabs.html');
  }

  async loadHash(hash) {
    const url = await this.driver.getCurrentUrl();
    await this.driver.get(`${url}${hash}`);
    await this.driver.navigate().refresh();
  }

  async _getTabs(selector) {
    return new VlTabs(this.driver, selector);
  }
}

module.exports = VlTabsPage;
