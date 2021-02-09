import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlTab
 * @class
 * @classdesc De vl-tab is een onderdeel van de vl-tabs dat een manier geeft aan de gebruiker om de tab informatie te openen.
 *
 * @extends HTMLLIElement
 * @mixes nativeVlElement
 *
 * @property {boolean} data-vl-href - Attribuut wordt gebruikt om de verborgen informatie van de tab zichtbaar te maken via een klik actie of via de hash van de URL.
 * @property {boolean} data-vl-id - Attribuut wordt gebruikt om de verborgen informatie van de tab sectie te koppelen aan de tab.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-tabs.html|Demo}
 *
 */
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
    return this.querySelector('.vl-tab__link');
  }

  get __linkElementTemplate() {
    return this._template(`<a class="vl-tab__link" data-vl-tab role="tab"></a>`);
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
    this.__tabLink.setAttribute('aria-controls', `${newValue}-pane`);
  }

  _idChangedCallback(oldValue, newValue) {
    this.__tabLink.id = newValue;
  }
}

define(VlTab.is, VlTab, {extends: 'li'});
