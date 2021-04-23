import {define, vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlTabsPaneTitle
 * @class
 * @classdesc De vl-tabs-pane-title bevat de titel van een vl-tab-pane element.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-tabs.html|Demo}
 *
 */
export class VlTabsPaneTitle extends vlElement(HTMLElement) {
  constructor() {
    super(`<slot></slot>`);
  }

  connectedCallback() {
    this.setAttribute('slot', `${this.id}-title-slot`);
  }

  get id() {
    return this.getAttribute('data-vl-id');
  }
}

define('vl-tabs-pane-title', VlTabsPaneTitle);
