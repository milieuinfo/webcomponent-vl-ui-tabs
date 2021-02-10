const VlTabs = require('../components/vl-tabs');
const {Page, Config} = require('vl-ui-core').Test;

class VlTabsActiveTabPage extends Page {
  async getTabs() {
    return this._getTabs('#tabs');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-tabs-active-tab.html');
  }

  async _getTabs(selector) {
    return new VlTabs(this.driver, selector);
  }
}

module.exports = VlTabsActiveTabPage;
