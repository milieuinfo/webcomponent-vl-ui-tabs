(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.tabs = factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Breakpoint = /*#__PURE__*/function () {
    function Breakpoint() {
      _classCallCheck(this, Breakpoint);

      this.value = null;
    } // Private functions


    _createClass(Breakpoint, [{
      key: "_getBreakpoint",
      value: function _getBreakpoint() {
        // transfer css breakpoints to JS
        return window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g, '');
      } // Public functions

    }, {
      key: "dress",
      value: function dress() {
        var _this = this;

        this.value = this._getBreakpoint();
        /**
         * Add eventlisteners to window
         */

        window.addEventListener('resize', vl.util.debounce(function () {
          _this.refreshValue();
        }), 50);
      }
    }, {
      key: "refreshValue",
      value: function refreshValue() {
        this.value = this._getBreakpoint();
      }
    }]);

    return Breakpoint;
  }();

  if (!('breakpoint' in vl)) {
    vl.breakpoint = new Breakpoint();
    vl.breakpoint.dress();
  }

  var tabActiveClass = "".concat(vl.ns, "tab--active"),
      tabClass = "".concat(vl.ns, "tab"),
      dataTabList = "[data-".concat(vl.ns, "tabs-list]"),
      dataTab = "[data-".concat(vl.ns, "tab]"),
      dataTabPane = "[data-".concat(vl.ns, "tab-pane]"),
      tabToggleAtt = "data-".concat(vl.ns, "tabs-toggle"),
      tabShowAtt = "data-".concat(vl.ns, "show"),
      tabCloseAtt = "data-".concat(vl.ns, "close"),
      tabsAtt = "data-".concat(vl.ns, "tabs");
  var breakpoint = new Breakpoint();
  breakpoint.dress();

  var Tabs = /*#__PURE__*/function () {
    function Tabs() {
      _classCallCheck(this, Tabs);

      this.currentTabIndexForCurrentTabsContainer = -1;
    }

    _createClass(Tabs, [{
      key: "resetTabIndexesForTabs",
      value: function resetTabIndexesForTabs(tabs) {
        vl.util.each(tabs, function (tab) {
          tab.setAttribute('tabindex', '-1');
          tab.setAttribute('aria-selected', 'false');

          if (typeof tab.closest === 'function') {
            // check for IE
            vl.util.removeClass(tab.closest(".".concat(tabClass)), tabActiveClass);
          }
        });
      }
    }, {
      key: "resetTabPanes",
      value: function resetTabPanes(tabPanes) {
        vl.util.each(tabPanes, function (pane) {
          pane.setAttribute('hidden', 'hidden');
          pane.setAttribute("".concat(tabShowAtt), 'false');
        });
      }
    }, {
      key: "showTabPaneForTab",
      value: function showTabPaneForTab(tab, tabPane) {
        // hightlight tab
        tab.setAttribute('tabindex', '0');

        if (typeof tab.closest === 'function') {
          // check for IE
          vl.util.addClass(tab.closest(".".concat(tabClass)), tabActiveClass);
        }

        tab.setAttribute('aria-selected', true); // hightlight pane

        tabPane.setAttribute('hidden', '');
        tabPane.setAttribute("".concat(tabShowAtt), 'true');
      }
    }, {
      key: "updateResponsiveBtnLabelForTabsContainerWithTab",
      value: function updateResponsiveBtnLabelForTabsContainerWithTab(tabsContainer, tab) {
        var toggleBtnEl = tabsContainer.querySelector("[".concat(tabToggleAtt, "] span"));
        toggleBtnEl.innerHTML = tab.innerHTML;
      }
    }, {
      key: "clickEvent",
      value: function clickEvent(event) {
        if (event.target && typeof event.target.closest === 'function') {
          // check for IE
          var tabsContainer = event.target.closest("[".concat(tabsAtt, "]"));
          var toggleBtnEl = tabsContainer.querySelector("[".concat(tabToggleAtt, "]"));
          var tabsList = tabsContainer.querySelector("".concat(dataTabList));
          var isListOpen = tabsList.getAttribute(tabShowAtt) === 'true';
          tabsList.setAttribute(tabShowAtt, isListOpen ? 'false' : 'true');
          tabsList.setAttribute('aria-hidden', isListOpen ? 'true' : 'false');
          toggleBtnEl.setAttribute('aria-expanded', isListOpen ? 'true' : 'false');
          toggleBtnEl.setAttribute(tabCloseAtt, isListOpen ? 'false' : 'true');
        }
      }
    }, {
      key: "setupResponsiveToggleBtnForTabsContainer",
      value: function setupResponsiveToggleBtnForTabsContainer(tabsContainer) {
        var toggleBtnEl = tabsContainer.querySelector("[".concat(tabToggleAtt, "]"));

        var bp = breakpoint._getBreakpoint(); // setup responsive toggle btn


        if (bp === 'xsmall' || bp === 'small') {
          toggleBtnEl.addEventListener('click', this.clickEvent, false);
        }
      }
    }, {
      key: "dress",
      value: function dress(tabsContainer) {
        var _this = this;

        this.setupResponsiveToggleBtnForTabsContainer(tabsContainer);
        var tabs = tabsContainer.querySelectorAll("".concat(dataTab));
        var tabPanes = tabsContainer.querySelectorAll("".concat(dataTabPane));

        if (tabPanes.length > 0) {
          vl.util.each(tabs, function (tab, index) {
            tab.addEventListener('focus', function () {
              _this.currentTabIndexForCurrentTabsContainer = index;
              tab.click();
            });
            tab.addEventListener('click', function () {
              // event.preventDefault();
              // reset tabs & panes
              _this.resetTabIndexesForTabs(tabs);
              _this.resetTabPanes(tabPanes); // set tab
              _this.showTabPaneForTab(tab, tabPanes[index]); // set responsive button label
              _this.updateResponsiveBtnLabelForTabsContainerWithTab(tabsContainer, tab);

              var toggleBtnEl = tabsContainer.querySelector("[".concat(tabToggleAtt, "]"));
              toggleBtnEl.click();
            });
          });

          // TODO is het gebruik van href om de active tab te bepalen wel gewenst ?
          //  - single page apps die routing doen via de # hack zijn hier door geimpacteerd lijkt mij
          //  - dit lijkt mij ook niet echt contained, daar er global scope gebruikt wordt
          var currentTabHash = window.location.hash;
          var activeTab = tabsContainer.querySelector("[href='".concat(currentTabHash, "']"));
          if (activeTab) {
            // TODO melden aan AIV
            //  de click moet eerst op alle tabs een vent listener krijgen, anders
            //  heeft volgende click geen effect. Vandaar dat we dit naar beneden
            //  verplaatst hebben.
            activeTab.click();
          } // only add click & focus listeners to tabs when there are panes to toggle

        } // Deteact arrow & spacebar usage on tabContainer


        tabsContainer.addEventListener('keydown', function (event) {
          switch (event.keyCode) {
            case 37:
   // empty
              // fallsthrough

            case 38:
              {
                // left arrow
                var i = _this.currentTabIndexForCurrentTabsContainer - 1;

                if (i < 0) {
                  i = tabs.length - 1;
                }

                var prevTabEl = tabs[i];

                if (prevTabEl) {
                  prevTabEl.focus();
                }

                break;
              }
            // fallsthrough

            case 39:
   // empty
              // fallsthrough

            case 40:
              {
                // right arrow
                var _i = _this.currentTabIndexForCurrentTabsContainer + 1;

                if (_i >= tabs.length) {
                  _i = 0;
                }

                var nextTabEl = tabs[_i];

                if (nextTabEl) {
                  nextTabEl.focus();
                }

                break;
              }

            default:
              break;
          }
        });
        window.addEventListener('resize', vl.util.debounce(function () {
          var bp = breakpoint._getBreakpoint(); // setup responsive toggle btn
          if (bp === 'xsmall' || bp === 'small') {
            var toggleBtnEl = tabsContainer.querySelector("[".concat(tabToggleAtt, "]"));
            toggleBtnEl.removeEventListener('click', _this.clickEvent, false);
            _this.setupResponsiveToggleBtnForTabsContainer(tabsContainer);
          }
        }, 0));
      }
    }, {
      key: "dressAll",
      value: function dressAll() {
        var _this2 = this;
        var wrappers = document.querySelectorAll("[".concat(tabsAtt, "]:not([data-").concat(vl.ns, "js-dress=\"false\"])"));
        vl.util.each(wrappers, function (tabsContainer) {
          _this2.dress(tabsContainer);
        });
      }
    }]);

    return Tabs;
  }();

  if (!('tabs' in vl)) {
    vl.tabs = new Tabs();
    // TODO we willen niet dat dit automatisch uitgevoerd wordt, we beheren
    //  de dress zelf in de component
    //vl.tabs.dressAll();
  }

  return Tabs;

}));