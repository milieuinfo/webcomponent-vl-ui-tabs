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

  get id() {
    return this.getAttribute('id');
  }

  get link() {
    return this.querySelector('.vl-tab__link');
  }

  get active() {
    return this.classList.contains('vl-tab--active');
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
    this.link.setAttribute('href', newValue);
  }

  _idChangedCallback(oldValue, newValue) {
    this.link.setAttribute('id', newValue);
    this.link.setAttribute('aria-controls', newValue+'-pane');
  }
}

define(VlTab.is, VlTab, {extends: 'li'});
