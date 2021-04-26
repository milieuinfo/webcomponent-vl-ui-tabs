const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlTab extends VlElement {
  async click() {
    const titleSlotElement = await this._getTitleSlotElement();
    const clickableElement = titleSlotElement ? titleSlotElement : await this._getLink();
    await clickableElement.click();
  }

  async getTitleText() {
    const titleSlotElement = await this._getTitleSlotElement();
    const titleElement = titleSlotElement ? titleSlotElement : await this._getTitleSlot();
    return await titleElement.getText();
  }

  async isActive() {
    return this.hasClass('vl-tab--active');
  }

  async _getLink() {
    return this.findElement(By.css('a'));
  }

  async _getTitleSlot() {
    const link = await this._getLink();
    const slot = await link.findElement(By.css('slot'));
    return slot;
  }

  async _getTitleSlotElement() {
    const slot = await this._getTitleSlot();
    const slotElements = await this.getAssignedElements(slot);
    return slotElements.length > 0 ? slotElements[0] : null;
  }

}

module.exports = VlTab;
