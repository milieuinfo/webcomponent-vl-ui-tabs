const {Config} = require('vl-ui-core').Test;
const VlTabsPage = require('./vl-tabs.page');

class VlTabsTitleSlotPage extends VlTabsPage {
  async load() {
    await super.load(Config.baseUrl + '/demo/vl-tabs-title-slot.html');
  }
}

module.exports = VlTabsTitleSlotPage;
