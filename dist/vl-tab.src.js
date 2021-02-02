import {
  awaitUntil,
  define,
  nativeVlElement,
} from 'vl-ui-core';

export class VlTab extends nativeVlElement(HTMLLIElement) {
  static get is() {
    return 'vl-tab';
  }

  static get _observedAttributes() {
    return ['href', 'id'];
  }

  constructor() {
    super();
    this.classList.add('vl-tab');
    const a = this.__LinkElementTemplate.firstElementChild;
    a.appendChild(this.childNodes[0]);
    this.appendChild(a);
  }

  get __tabLink() {
    return this.querySelector('#tabLink');
  }

  get __LinkElementTemplate() {
    return this._template(`<a id="tabLink" class="vl-tab__link" data-vl-tab role="tab"></a>`);
  }

  set href(link) {
    return this.setAttribute('data-vl-href', link);
  }

  set id(id) {
    return this.setAttribute('data-vl-id', id);
  }

  _hrefChangedCallback(oldValue, newValue) {
    // this.__href = newValue;
    this.__tabLink.setAttribute('href', newValue);
  }

  _idChangedCallback(oldValue, newValue) {
    // this.__id = newValue;
    this.__tabLink.setAttribute('id', newValue);
  }
}

define(VlTab.is, VlTab, {extends: 'li'});

