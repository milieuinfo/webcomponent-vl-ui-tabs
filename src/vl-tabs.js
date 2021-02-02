import {
  awaitUntil,
  define,
  vlElement,
} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlTabPane} from './vl-tab-pane.js';
import './vl-tab.js';

import '/lib/tabs.js';

/**
 * VlTabs
 * @class
 * @classdesc Use tab navigation to break related information into smaller chuncks of content. When working with tabs, some content is hidden. Therefore it's important to label the tabs wisely, allowing the user to know exactly what to expect in a tab. On mobile, tab navigation is transformed into a dropdown menu.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-tabs/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-tabs.html|Demo}
 *
 */
export class VlTabs extends vlElement(HTMLElement) {
  static get is() {
    return 'vl-tabs';
  }

  static get _observedAttributes() {
    return ['alt', 'responsive-label'];
  }

  constructor() {
    super(`
    <style>
      @import '/src/style.css';
    </style>
    <div id="tabs" data-vl-tabs data-vl-tabs-responsive-label="Navigatie">
      <div id="tabsWrapper" class="vl-tabs__wrapper">
        <ul id="tabList" class="vl-tabs" data-vl-tabs-list role="tablist"></ul>  
        <button type="button" data-vl-tabs-toggle aria-expanded="false" class="vl-tabs__toggle" data-vl-close="false">
            <span id="data-vl-tabs-responsive-label">Navigatie</span>  
        </button>
      </div>
    </div>`);
  }

  connectedCallback() {
    this._renderTabs();
    this._renderSections();
    vl.tabs.dress(this.shadowRoot);
  }

  get __tabs() {
    return this.shadowRoot.getElementById('tabs');
  }

  get __tabList() {
    return this.shadowRoot.getElementById('tabList');
  }

  get __responsiveLabel() {
    return this.shadowRoot.getElementById('data-vl-tabs-responsive-label');
  }

  get __tabPanes() {
    return this.querySelectorAll(VlTabPane.is);
  }

  _renderTabs() {
    this.__tabList.innerHTML = '';
    [...this.__tabPanes].forEach((tp) => {
      const pathname = window.location.pathname;
      this.__tabList.appendChild(this._template(`
        <li is="vl-tab"
          data-vl-href="${pathname}#${(tp.id)}" 
          data-vl-id="${(tp.id)}">
            ${(tp.title)}
        </li>
      `));
    });
  }

  _renderSections() {
    [...this.__tabPanes].forEach((tp) => {
      tp.setAttribute('slot', tp.id + '-slot');

      this.__tabs.appendChild(this._template(`
        <section class="vl-col--1-1 vl-tab__pane" 
          data-vl-tab-pane tabindex="0" 
          role="tabpanel" 
          id="${(tp.id)}-pane" 
          hidden="hidden">
          <slot name="${(tp.id)}-slot"></slot>
        </section>
      `));
    });
  }

  _altChangedCallback(oldValue, newValue) {
    if (this.hasAttribute('data-vl-alt')) {
      this.__tabList.classList.add('vl-tabs--alt');
    } else {
      this.__tabList.classList.remove('vl-tabs--alt');
    }
  }

  _responsiveLabelChangedCallback(oldValue, newValue) {
    const value = newValue || 'Navigatie';
    this.__tabs.setAttribute('data-vl-tabs-responsive-label', value);
    this.__responsiveLabel.innerHTML = value;
  }
}

awaitUntil(() => window.vl && window.vl.tabs).then(() => {
  define(VlTabs.is, VlTabs);
});
