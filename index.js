import React, { Component, PropTypes } from 'react'
import ActionCable from 'actioncable'

ActionCable.getConfig = () => null
ActionCable.createWebSocketURL = (url) => url.replace(/^http/, 'ws')

const oldOpen = ActionCable.Connection.prototype.open
ActionCable.Connection.prototype.open = function () {
  const result = oldOpen.apply(this)
  this.webSocket.protocol = 'actioncable-v1-json'
  return result
}

global.document = {
  addEventListener () {},
  removeEventListener () {}
}

export default ActionCable
