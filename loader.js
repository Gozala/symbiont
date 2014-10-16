/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var { Loader } = Components.utils.import("resource://gre/modules/commonjs/toolkit/loader.js", {});
var loader = Loader.Loader({
  id: "symbiont",
  isNative: true,
  prefixURI: "resource://symbiont/chrome/content/",
  rootURI: "resource://symbiont/chrome/content/",
  name: "symbiont",
  paths: {
    "": "resource://symbiont/node_modules/",
    "react/": "resource://symbiont/node_modules/react/dist/",
    "symbiont/": "resource://symbiont/chrome/content/",
    "sdk/": "resource://gre/modules/commonjs/sdk/",
    "toolkit/": "resource://gre/modules/commonjs/toolkit/",
    "diffpatcher/": "resource://gre/modules/commonjs/diffpatcher/",
    "dev/": "resource://gre/modules/commonjs/dev/",
    "method/": "resource://gre/modules/commonjs/method/",
    "devtools/": "resource://gre/modules/devtools/"
  },
  manifest: {},
  metadata: {},
  modules: {},
  globals: {
    console: console,
    window: window,
    document: document,
    navigator: navigator,
    process: {
      get env() {
        return require("sdk/system/environment").env
      }
    }
  }
});
var main = Loader.Module("symbiont/main", "resource://symbiont/chrome/content/main.js");
var require = Loader.Require(loader, main);
require("./main.js")
