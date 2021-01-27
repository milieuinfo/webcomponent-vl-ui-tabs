import {
  awaitUntil,
  define,
  vlElement,
} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-tabs/lib/tabs.js';

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
    return ['active-tab'];
  }

  constructor() {
    super(`
    <style>
      @import '/node_modules/vl-ui-tabs/dist/style.css';
      
      .vl-tabs--alt::before {
        width: auto;
      }
    </style>
    <div id="tabs" data-vl-tabs data-vl-tabs-responsive-label="Navigatie">
      <div id="tabsWrapper" class="vl-tabs__wrapper">
        <ul id="tabList" class="vl-tabs vl-tabs--alt" data-vl-tabs-list role="tablist">
        </ul>  
        <button type="button" 
          data-vl-tabs-toggle aria-expanded="false" 
          class="vl-tabs__toggle" 
          data-vl-close="false">
          <span>Navigatie</span>  
        </button>
      </div>
    </div>`);
  }

  connectedCallback() {
    this._renderTabs();
    this._renderSections();
    this.__registerActiveTabListeners();
    vl.tabs.dress(this.shadowRoot);
    this.__updateActiveTab(this.getAttribute('data-vl-active-tab'));
  }

  _renderTabs() {
    this.__tabList.innerHTML = '';
    [...this.__tabPanes].forEach((tp) => {
      const title = tp.getAttribute('data-vl-title');
      const id = tp.getAttribute('data-vl-id');
      const pathname = window.location.pathname;
      this.__tabList.appendChild(this._template(`
        <li class="vl-tab">
          <a class="vl-tab__link" 
            href="${pathname}#${id}" 
            id="${id}" 
            data-vl-tab role="tab" >${title}</a>
        </li>
      `));
    });
  }

  _renderSections() {
    [...this.__tabPanes].forEach((tp, index) => {
      const id = tp.getAttribute('data-vl-id');
      tp.setAttribute('slot', id + '-' + index);

      this.__tabs.appendChild(this._template(`
        <section class="vl-col--1-1 vl-tab__pane" 
          data-vl-tab-pane tabindex="0" 
          role="tabpanel" 
          id="${id}-pane" 
          hidden="hidden">
          <slot name="${id}-${index}"></slot>
        </section>
      `));
    });
  }

  __updateActiveTab(activeTab) {
    this.shadowRoot.querySelectorAll('[data-vl-tab]').forEach((tb) => {
      if (tb.id === activeTab) {
        setTimeout(() => tb.click());
      }
    });
  }

  __registerActiveTabListeners() {
    this.shadowRoot.querySelectorAll('[data-vl-tab]').forEach((tb) => {
      tb.addEventListener('click', () => {
        if (this.getAttribute('data-vl-active-tab') !== tb.id) {
          this.dispatchEvent(new CustomEvent('change', {detail: tb.id, bubbles: true, composed: true}));
        }
      });
    });
  }

  __hasActiveTabClass(element) {
    return element.getAttribute('class').indexOf('vl-tab--active') < 0;
  }

  get __tabList() {
    return this.shadowRoot.getElementById('tabList');
  }

  get __tabs() {
    return this.shadowRoot.getElementById('tabs');
  }

  get __tabPanes() {
    return this.querySelectorAll(VlTabPane.is);
  }

  _activeTabChangedCallback(oldValue, newValue) {
    this.__updateActiveTab(newValue);
  }
}

export class VlTabPane extends vlElement(HTMLElement) {
  static get is() {
    return 'vl-tabs-pane';
  }

  constructor() {
    super(`<slot></slot>`);
  }
}

awaitUntil(() => window.vl && window.vl.tabs).then(() => {
  define(VlTabs.is, VlTabs);
  define(VlTabPane.is, VlTabPane);
});
