"use strict";

var React = require("react/dist/react")
var DOM = React.DOM
var Window = require("./window").Window

var conj = function(source, extension) {
  var result = {}
  if (source) {
    Object.keys(source).forEach(function(key) {
      result[key] = source[key]
    })
  }
  Object.keys(extension).forEach(function(key) {
    result[key] = extension[key]
  })
  return result
}

var assoc = function(source, key, value) {
  var result = {}
  if (source) {
    Object.keys(source).forEach(function(key) {
      result[key] = source[key]
    })
  }
  result[key] = value
  return result
}

var Browser = React.createClass({
  getFrameNode: function() {
    return this.getDOMNode().querySelector("iframe")
  },
  componentWillMount: function() {
    this.setState(assoc(null, "uri", this.props.uri))
  },
  componentDidMount: function() {
    var container = this.getDOMNode()
    var frame = document.createElement("iframe")
    frame.setAttribute("class", "browser")
    frame.setAttribute("name", "browser")
    frame.setAttribute("src", this.state.uri)

    frame.setAttribute("mozallowfullscreen", "true");
    frame.setAttribute("mozbrowser", true)
    //frame.setAttribute("mozapp", "symbiont")
    //frame.setAttribute("expecting-system-message",
    //                   "expecting-system-message")
    // TODO: For whatever reason making mozbrowser iframe remote
    // causes following error:
    // NeckoParent::AllocPHttpChannelParent: FATAL error: App does not have permission: KILLING CHILD PROCESS
    // Disable remoting for now.
    //frame.setAttribute("remote", true)
    //frame.setAttribute("mozapptype", "homescreen")
    //frame.setAttribute("mozasyncpanzoom", true);

    frame.addEventListener("mozbrowserloadstart", this.onPageLoadStart)
    frame.addEventListener("mozbrowserloadend", this.onPageLoadEnd)
    frame.addEventListener("mozbrowserclose", this.onPageClose)
    frame.addEventListener("mozbrowseropenwindow", this.onPageOpen)
    frame.addEventListener("mozbrowserasyncscroll", this.onPageScroll)
    frame.addEventListener("mozbrowsererror", this.onPageError)
    frame.addEventListener("mozbrowsershowmodalprompt", this.onPageDialog)

    frame.addEventListener("mozbrowserlocationchange", this.onLocationChange)
    frame.addEventListener("mozbrowsericonchange", this.onIconChange)
    frame.addEventListener("mozbrowsertitlechange", this.onTitleChange)

    frame.addEventListener("mozbrowsercontextmenu", this.onContextMenu)


    container.appendChild(frame)
  },
  componentWillUnmount: function() {
    var frame = this.getFrameNode()

    frame.removeEventListener("mozbrowserloadstart", this.onPageLoadStart)
    frame.removeEventListener("mozbrowserloadend", this.onPageLoadEnd)
    frame.removeEventListener("mozbrowserclose", this.onPageClose)
    frame.removeEventListener("mozbrowseropenwindow", this.onPageOpen)
    frame.removeEventListener("mozbrowserasyncscroll", this.onPageScroll)
    frame.removeEventListener("mozbrowsererror", this.onPageError)
    frame.removeEventListener("mozbrowsershowmodalprompt", this.onPageDialog)

    frame.removeEventListener("mozbrowserlocationchange", this.onLocationChange)
    frame.removeEventListener("mozbrowsericonchange", this.onIconChange)
    frame.removeEventListener("mozbrowsertitlechange", this.onTitleChange)

    frame.removeEventListener("mozbrowsercontextmenu", this.onContextMenu)
  },

  onPageLoadStart: function(event) {
    var handler = this.props.onPageLoadStart
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onPageLoadEnd: function(event) {
    var handler = this.props.onPageLoadEnd
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onPageClose: function(event) {
    var handler = this.props.onPageClose
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onPageOpen: function(event) {
    var handler = this.props.onPageOpen
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onPageScroll: function(event) {
    var handler = this.props.onPageScroll
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onPageError: function(event) {
    var handler = this.props.onPageError
    if (handler) {
      handler(event)
    }
    // console.error(event)
  },
  onPageDialog: function(event) {
    var handler = this.props.onPageDialog
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onLocationChange: function(event) {
    this.setState(assoc(this.state, "uri", event.detail))
    var handler = this.props.onLocationChange
    if (handler) {
      handler(this.state.uri)
    }
  },
  onIconChange: function(event) {
    var handler = this.props.onIconChange
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },
  onTitleChange: function(event) {
    var handler = this.props.onTitleChange
    if (handler) {
      handler(event.detail)
    }
    // console.log(event)
  },
  onContextMenu: function(event) {
    var handler = this.props.onContextMenu
    if (handler) {
      handler(event)
    }
    // console.log(event)
  },

  componentWillReceiveProps: function(props) {
    this.setState({uri: props.uri})
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.uri !== nextProps.uri
  },
  componentDidUpdate: function(pastProps, pastState) {
    var frame = this.getFrameNode()
    // Internal URIS can't load in remote iframe
    if (this.props.uri.indexOf("about:") === 0 ||
        this.props.uri.indexOf("chrome:") === 0 ||
        this.props.uri.indexOf("resource:") === 0)
        frame.setAttribute("remote", false)
    else
        frame.setAttribute("remote", true)

    frame.setAttribute("src", this.state.uri)
    if (this.props.focused)
      frame.focus()
  },
  render: function() {
    return DOM.section({ className: "column" })
  }
})
exports.Browser = Browser

var AddressBar = React.createClass({
  getInitialState: function() {
    return { input: this.props.uri }
  },

  componentWillReceiveProps: function(props) {
    if (props.uri !== this.state.uri) {
      this.setState(assoc(this.state, "input", props.uri))
    }
  },

  componentDidUpdate: function() {
    if (this.props.focused) {
      this.getDOMNode().focus()
    }
  },

  navigateTo: function(uri) {
    this.props.onNavigate(uri)
  },

  onChange: function(event) {
    this.setState({input: event.target.value})
  },
  onKey: function(event) {
    if (event.keyCode === 13)
      this.navigateTo(this.state.input)
  },
  render: function() {
    return DOM.input({
      type: "text",
      className: "address-bar",
      value: this.state.input,
      onChange: this.onChange,
      onKeyDown: this.onKey
    })
  }
})
exports.AddressBar = AddressBar

var App = React.createClass({
  getInitialState: function() {
    return {title: "Symbiont",
            uri: "about:blank",
            focused: "address-bar"}
  },
  onSelectAddressBar: function() {
    this.setState(assoc(this.state, "focused", "address-bar"))
  },
  onTitleChange: function(title) {
    this.setState(assoc(this.state, "title", title))
  },
  onNavigate: function(input) {
    var uri = /^\S+\:/.test(input) ? input : "http://" + input
    this.setState(conj(this.state, {uri: uri, focused: "browser"}))
  },
  onKeydown: function(event) {
    var keys = []
    if (event.metaKey) keys.push("meta")
    if (event.ctrlKey) keys.push("ctrl")
    if (event.shiftKey) keys.push("shift")
    if (event.altKey) keys.push("alt")
    if (["Alt", "Ctrl", "Meta", "Shift"].indexOf(event.key) < 0)
      keys.push(event.key)

    var combo = this.props.keyMap && this.props.keyMap[keys.join("-")]
    if (combo)
      combo.call(this, event)
  },
  render: function() {
    return Window({
        title: this.state.title,
        onKeyDown: this.onKeydown
    }, [
      DOM.menu({className: "title-bar"}, [
        DOM.menu({id: "title-bar-buttons", className: "window-controls" }),
        DOM.nav({className: "navigation-controls"}),
        DOM.nav({className: "navigation-bar"}, [
          AddressBar({onNavigate: this.onNavigate,
                      uri: this.state.uri,
                      focused: this.state.focused === "address-bar"}) ]),
        DOM.nav({className: "display-controls"})
      ]),
      Browser({uri: this.state.uri,
               focused: this.state.focused === "browser",
               onLocationChange: this.onNavigate,
               onTitleChange: this.onTitleChange})
    ])
  }
})
exports.App = App

var app = App({
  keyMap: {
    "meta-l": function() {
      this.onSelectAddressBar()
    }
  }
})

document.querySelector("#ui").addEventListener("load", function(event) {
  React.renderComponent(app, event.target.body)
}, true)
