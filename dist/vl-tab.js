import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

export class VlTab extends nativeVlElement(HTMLLIElement) {
  static get is() {
    return 'vl-tab';
  }

  static get _observedAttributes() {
    return ['href', 'id'];
  }

  constructor() {
    super();
    this._processClasses();
    this._processLinkElement();
  }

  get __tabLink() {
    return this.querySelector('#tabLink');
  }

  get __linkElementTemplate() {
    return this._template(`<a id="tabLink" class="vl-tab__link" data-vl-tab role="tab"></a>`);
  }

  _processClasses() {
    this.classList.add('vl-tab');
  }

  _processLinkElement() {
    const a = this.__linkElementTemplate.firstElementChild;
    a.appendChild(this.childNodes[0]);
    this.appendChild(a);
  }

  _hrefChangedCallback(oldValue, newValue) {
    this.__tabLink.setAttribute('href', newValue);
  }

  _idChangedCallback(oldValue, newValue) {
    this.__tabLink.setAttribute('id', newValue);
    this.__tabLink.setAttribute('aria-controls', newValue+'-pane');
  }
}

define(VlTab.is, VlTab, {extends: 'li'});
