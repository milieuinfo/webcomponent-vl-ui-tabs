import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

export class VlTabSection extends nativeVlElement(HTMLElement) {
  static get is() {
    return 'vl-tab-section';
  }

  constructor() {
    super();
    this._processClasses();
    this._processAttributes();
  }

  _processClasses() {
    this.classList.add('vl-col--1-1');
    this.classList.add('vl-tab__pane');
  }

  _processAttributes() {
    this.setAttribute('data-vl-tab-pane', '');
    this.setAttribute('tabindex', 0);
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('hidden', 'hidden');
  }
}

define(VlTabSection.is, VlTabSection, {extends: 'section'});

