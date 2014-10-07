"use strict";

var React = require("react/dist/react")
var DOM = React.DOM;
var prefs = require("sdk/preferences/service")

var Window = React.createClass({
  sizeKey: "browser.window.size",
  positionKey: "browser.window.position",
  fullScreenKey: "browser.window.fullscreen",
  getWindowSize: function() {
    return window.outerWidth + " x " + window.outerHeight
  },
  getWindowPosition: function() {
    return window.screenX + "," + window.screenY
  },
  getWindowFullScreen: function() {
    // TODO: Update to standard API once implemented
    // https://developer.mozilla.org/en-US/docs/Web/Events/fullscreenchange
    return window.fullScreen
  },
  getInitialState: function() {
    var size = prefs.get(this.sizeKey, this.getWindowSize()).split(" x ")
    var position = prefs.get(this.positionKey, this.getWindowPosition()).split(",")
    var isFullScreen = prefs.get(this.fullScreenKey, this.getWindowFullScreen())
    return {width: size[0],
            height: size[1],
            position: position,
            isFullScreen: isFullScreen}
  },
  /*
  onFullScreen: function() {
    // Inverse value since event handler is called before state actually
    // is reflected in DOM.
    var isFullScreen = !this.getWindowFullScreen()
    prefs.set(this.fullScreenKey, isFullScreen)
    this.setState({width: this.state.width,
                   height: this.state.height,
                   position: this.state.position,
                   isFullScreen: isFullScreen})
  },
  */
  onResize: function(event) {
    //if (!this.state.isFullScreen) {
      var size = this.getWindowSize()
      prefs.set(this.sizeKey, size)
      var width$height = size.split(" x ")
      this.setState({width: width$height[0],
                     height: width$height[1],
                     position: this.state.position,
                     isFullScreen: this.state.isFullScreen})
    //}
  },
  onPositionChange: function() {
    //if (!this.state.isFullScreen) {
      var position = this.getWindowPosition()
      prefs.set(this.positionKey, position)
      this.setState({width: this.state.width,
                     height: this.state.height,
                     position: position.split(","),
                     isFullScreen: this.state.isFullScreen})
    //}
  },
  componentDidMount: function() {
    // TODO: Update to standard API once implemented
    // https://developer.mozilla.org/en-US/docs/Web/Events/fullscreenchange
    //window.addEventListener("fullscreen", this.onFullScreen)
    window.addEventListener("resize", this.onResize)
    window.addEventListener("pagehide", this.onPositionChange)

    console.log("state >> ", this.state)

    if (this.state.isFullScreen) {
      //window.fullScreen = true
    } else {
      window.resizeTo(this.state.width,
                      this.state.height)
      window.moveTo(this.state.position[0],
                    this.state.position[1])
    }
  },
  componentWillUnmount: function() {
    // TODO: Update to standard API once implemented
    // https://developer.mozilla.org/en-US/docs/Web/Events/fullscreenchange
    //window.removeEventListener("fullscreen", this.onFullScreen)
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("pagehide", this.onPositionChange)
  },
  render: function() {
    return DOM.div({className: "column"}, [
      DOM.ul({className: "info nil"}, [
        DOM.li("Size:", this.state.width + " x " + this.state.height),
        DOM.li("Position:", this.state.position),
        DOM.li("Fullscreen:", this.state.isFullScreen)
      ]),
      this.props.children
    ])
  }
})
exports.Window = Window
