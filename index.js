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

export class ActionCableProvider extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.any
  };

  static childContextTypes = {
    cable: PropTypes.object.isRequired
  };

  constructor (props, ...args) {
    super(props, ...args)

    this.cable = ActionCable.createConsumer(this.props.url)
  }

  getChildContext () {
    return {
      cable: this.cable
    }
  }

  render () {
    console.log(this.cable)
    return this.props.children
  }
}
