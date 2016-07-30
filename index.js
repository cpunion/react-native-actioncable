import ActionCable from 'actioncable'

ActionCable.getConfig = () => null
ActionCable.createWebSocketURL = (url) => {
  const result = url.replace(/^http/, 'ws')
  console.log(result)
  return result
}
ActionCable.startDebugging()

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
