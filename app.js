require.config({
  scriptType: 'text/javascript;version=1.8',
  baseUrl: "node_modules",
  nodeIdCompat: true,
  paths: {
    "react": "react/dist/react"
  },
  shim: {
    "react": {
      exports: "React"
    }
  }
});

require(["symbiont/main"]);
