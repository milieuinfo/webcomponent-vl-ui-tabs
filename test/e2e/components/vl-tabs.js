const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const VlTab = require('./vl-tab');

class VlTabs extends VlElement {
  async getTabs() {
    const elements = await this._getTabElements();
    return Promise.all(elements.map((element) => new VlTab(this.driver, element)));
  }

  async _getTabListElement() {
    return this.shadowRoot.findElement(By.css('#tabList'));
  }

  async _getTabElements() {
    const list = await this._getTabListElement();
    return list.findElements(By.css('.vl-tab'));
  }
}

module.exports = VlTabs;
