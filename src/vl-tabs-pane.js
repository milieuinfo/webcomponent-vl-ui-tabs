import {define, vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlTabsPane
 * @class
 * @classdesc De vl-tabs-pane is een verzameling van de vl-tab en vl-tab-section en zal deze componenten automatisch genereren.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-tabs.html|Demo}
 *
 */
export class VlTabsPane extends vlElement(HTMLElement) {
  static get is() {
    return 'vl-tabs-pane';
  }

  static get _observedAttributes() {
    return ['id', 'title'];
  }

  constructor() {
    super(`<slot name="title" hidden></slot><slot></slot>`);
  }

  connectedCallback() {
    this._processSlots();
  }

  get id() {
    return this.getAttribute('data-vl-id');
  }

  get title() {
    if (this._hasTitleAttribute) {
      return this.getAttribute('data-vl-title');
    } else {
      return this._titleSlot.assignedNodes()[0];
    }
  }

  get _hasTitleAttribute() {
    return this.hasAttribute('data-vl-title');
  }

  get _titleSlot() {
    return this.shadowRoot.querySelector('slot[name="title"]');
  }

  _processSlots() {
    if (this._hasTitleAttribute) {
      this._titleSlot.remove();
    }
  }
}

define(VlTabsPane.is, VlTabsPane);
