import {awaitUntil, define, vlElement} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlTabPane} from '/node_modules/vl-ui-tabs/dist/vl-tab-pane.js';
import '/node_modules/vl-ui-tabs/dist/vl-tab.js';
import '/node_modules/vl-ui-tabs/lib/tabs.js';

/**
 * VlTabs
 * @class
 * @classdesc Use tab navigation to break related information into smaller chuncks of content. When working with tabs, some content is hidden. Therefore it's important to label the tabs wisely, allowing the user to know exactly what to expect in a tab. On mobile, tab navigation is transformed into a dropdown menu.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-alt - Attribuut om de alt variant van de tabs te tonen. Deze variant dient gebruikt te worden als subnavigatie onder de functional header.
 * @property {boolean} data-vl-responsive-label - Attribuut om de waarde in de tabs in responsive mode te veranderen. Enkel van toepassing wanneer geen tab is gekozen.
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
      @import '/node_modules/vl-ui-tabs/dist/style.css';
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
    this.__dress();
    this._observer = this.__observeChildElements((mutation) => {
      mutation.forEach((m) => {
        [...m.addedNodes].filter((node) => node.tagName === 'VL-TABS-PANE').forEach((node) => {
          this.__addObservedTabs(node);
        });
        [...m.removedNodes].filter((node) => node.tagName === 'VL-TABS-PANE').forEach((node) => {
          this.__removeObservedTabs(node);
        });
      });
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  __observeChildElements(callback) {
    const observer = new MutationObserver(callback);
    observer.observe(this,
        {childList: true, attributes: false, subtree: false});
    return observer;
  }

  __addObservedTabs(node) {
    // get location of tab
    const i = [...this.__tabPanes]
        .map((tabPane) => tabPane.getAttribute('data-vl-id'))
        .indexOf(node.getAttribute('data-vl-id'));

    const tabPaneElement = this.__tabSectionElement(this.__tabPanes[i]);
    const listElement = this.__tabListElement(this.__tabPanes[i]);
    // add event listener to new tab for active-tab change event
    // this.__tabEventListener(tabPaneElement);

    if (i === this.__tabPanes.length - 1) {
      this.__tabList.appendChild(listElement);
      this.__tabs.appendChild(tabPaneElement);
    } else {
      // i = location where new tab needs to be, where currently a tab is.
      this.__tabList.insertBefore(listElement,
          this.__tabList.children[i]);
      // i+1 because of tabsWrapper
      this.__tabs.insertBefore(tabPaneElement,
          this.__tabs.children[i+1]);
    }
    vl.tabs.dress(this.shadowRoot);
  }

  __removeObservedTabs(node) {
    const listElement = this._shadow.querySelector('[data-vl-id="'+node.id+'"');
    const tabPaneElement = this._shadow.querySelector('#'+node.id+'-pane');
    this.__tabList.removeChild(listElement);
    this.__tabs.removeChild(tabPaneElement);
    vl.tabs.dress(this.shadowRoot);
  }

  get _dressed() {
    return !!this.getAttribute(VlTabs._dressedAttributeName);
  }

  static get _dressedAttributeName() {
    return 'data-vl-tabs-dressed';
  }

  __dress() {
    if (!this._dressed) {
      vl.tabs.dress(this.shadowRoot);
      this.setAttribute(VlTabs._dressedAttributeName, '');
    }
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
    [...this.__tabPanes].forEach((tabPane) => {
      this.__tabList.appendChild(this.__tabListElement(tabPane));
    });
  }

  _renderSections() {
    [...this.__tabPanes].forEach((tabPane) => {
      this.__tabs.appendChild(this.__tabSectionElement(tabPane));
    });
  }

  __tabListElement(tabPane) {
    const pathname = window.location.pathname;
    return this._template(`
        <li is="vl-tab" data-vl-href="${pathname}#${(tabPane.id)}" data-vl-id="${(tabPane.id)}">
          ${(tabPane.title)}
        </li>
      `);
  }

  __tabSectionElement(tabPane) {
    tabPane.setAttribute('slot', tabPane.id + '-slot');
    return this._template(`
        <section id="${(tabPane.id)}-pane" is="vl-tab-section" aria-labelledby="${(tabPane.id)}">
          <slot name="${(tabPane.id)}-slot"></slot>
        </section>
      `);
  }

  _altChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
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
