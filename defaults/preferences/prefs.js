pref("toolkit.defaultChromeURI", "chrome://symbiont/content/index.html");

/* debugging prefs, disable these before you deploy your application! */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", false);
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

// Enable mozbrowser for iframe
pref("dom.mozBrowserFramesEnabled", true);
pref("dom.ipc.browser_frames.oop_by_default", false);
pref("network.disable.ipc.security", true);

//pref("dom.ipc.tabs.disabled", false);
//pref("dom.ipc.processCount", 1);
//pref("dom.ipc.plugins.enabled", true);
//pref("dom.ipc.content.nice", 1);
//pref("dom.ipc.tabs.disabled", false);
//pref("dom.ipc.tabs.nested.enabled", true);
//pref("dom.ipc.reuse_parent_app", true);
//pref("dom.ipc.plugins.enabled", true);
//pref("dom.ipc.processPrelaunch.enabled", true);
//pref("dom.ipc.plugins.enabled.i386", true);
//pref("dom.ipc.plugins.enabled.x86_64", true);

// Disable titlebar
pref("browser.tabs.drawInTitlebar", true);
