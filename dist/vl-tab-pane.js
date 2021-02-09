import {define, vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';

export class VlTabPane extends vlElement(HTMLElement) {
  static get is() {
    return 'vl-tabs-pane';
  }

  static get _observedAttributes() {
    return ['id', 'title'];
  }

  constructor() {
    super(`<slot></slot>`);
  }

  get id() {
    return this.getAttribute('data-vl-id');
  }

  get title() {
    return this.getAttribute('data-vl-title');
  }
}

define(VlTabPane.is, VlTabPane);
