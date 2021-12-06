/* eslint no-multi-assign: "off" */
/* eslint func-names: "off" */
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import 'core-js/features/function';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/map';
import 'core-js/features/set';

if (global.window && global.window.Element) {
  global.window.Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };
}
if (global.window && global.window.NodeList) {
  global.window.NodeList.prototype.remove = global.window.HTMLCollection.prototype.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}
