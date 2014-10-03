pref("toolkit.defaultChromeURI", "chrome://symbiont/content/main.xul");

/* debugging prefs, disable these before you deploy your application! */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", true);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);


pref("full-screen-api.enabled", true);

// IndexedDB
pref("dom.indexedDB.enabled", true);
pref("dom.indexedDB.warningQuota", 50);


// Offline cache prefs
pref("browser.offline-apps.notify", false);
pref("browser.cache.offline.enable", true);
pref("offline-apps.allow_by_default", true);

// TCPSocket
pref("dom.mozTCPSocket.enabled", true);

// Enable smooth scrolling
pref("general.smoothScroll", true);

pref("devtools.debugger.remote-enabled", true);
pref("devtools.debugger.force-local", true);

// Temporarily disable connection promt
pref("devtools.debugger.prompt-connection", false);
