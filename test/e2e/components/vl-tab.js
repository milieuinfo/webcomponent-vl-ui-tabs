const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlTab extends VlElement {
  async click() {
    const link = await this._getLink();
    await link.click();
  }

  async getTitleSlotNodes() {
    const slot = await this._getTitleSlot();
    return this.getAssignedNodes(slot);
  }

  async isActive() {
    return this.hasClass('vl-tab--active');
  }

  async _getLink() {
    return this.findElement(By.css('a'));
  }

  async _getTitleSlot() {
    const link = await this._getLink();
    return link.findElement(By.css('slot'));
  }
}

module.exports = VlTab;
