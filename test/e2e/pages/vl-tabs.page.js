const VlTabs = require('../components/vl-tabs');
const {Page, Config} = require('vl-ui-core').Test;

class VlTabsPage extends Page {
  async getTabs() {
    return this._getTabs('#tabs');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-tabs.html');
  }

  async _getTabs(selector) {
    return new VlTabs(this.driver, selector);
  }
}

module.exports = VlTabsPage;
