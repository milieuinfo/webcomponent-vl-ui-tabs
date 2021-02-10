const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlTab extends VlElement {
  async click() {
    const link = await this._getLink();
    await link.click();
  }

  async _getLink() {
    return this.findElement(By.css('a'));
  }
}

module.exports = VlTab;
