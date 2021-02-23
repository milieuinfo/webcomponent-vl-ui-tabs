const {Config} = require('vl-ui-core').Test;
const VlTabsPage = require('./vl-tabs.page');

class VlTabsActiveTabBasePage extends VlTabsPage {
  async load() {
    await super.load(Config.baseUrl + '/demo/vl-tabs-base.html');
  }
}

module.exports = VlTabsActiveTabBasePage;
