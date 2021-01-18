const VlTabs = require('../components/vl-tabs');
const {Page, Config} = require('vl-ui-core').Test;

class VlTabsPage extends Page {
  async _getTabs(selector) {
    return new VlTabs(this.driver, selector);
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-tabs.html');
  }
}

module.exports = VlTabsPage;
