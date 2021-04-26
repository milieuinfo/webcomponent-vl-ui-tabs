const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlTab extends VlElement {
  async click() {
    const link = await this._getLink();
    const slot = await link.findElement(By.css('slot'));
    const slotElements = await this.getAssignedElements(slot);
    const clickableElement = slotElements.length === 0 ? link : slotElements[0];
    await clickableElement.click();
  }

  async getTitleText() {
    const link = await this._getLink();
    const slot = await link.findElement(By.css('slot'));
    const slotElements = await this.getAssignedElements(slot);
    const titleElement = slotElements.length === 0 ? slot : slotElements[0];
    return await titleElement.getText();
  }

  async isActive() {
    return this.hasClass('vl-tab--active');
  }

  async _getLink() {
    return this.findElement(By.css('a'));
  }
}

module.exports = VlTab;
