import {
  awaitUntil,
  define,
  vlElement,
} from 'vl-ui-core';

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

  set id(id) {
    this.setAttribute('data-vl-id', id);
  }

  set title(title) {
    this.setAttribute('data-vl-title', title);
  }

  get id() {
    return this.getAttribute('data-vl-id');
  }

  get title() {
    return this.getAttribute('data-vl-title');
  }

  _idChangedCallback(oldValue, newValue) {
    this.id = newValue;
  }

  _titleChangedCallback(oldValue, newValue) {
    this.title = newValue;
  }
}

awaitUntil(() => window.vl && window.vl.tabs).then(() => {
  define(VlTabPane.is, VlTabPane);
});
