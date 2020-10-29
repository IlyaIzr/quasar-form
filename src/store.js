export const store = {
  debug: false,
  state: {
    watcher: 'a'
  },
  updateKeyValue(key, value) {
    if (this.debug) console.log('key ' + key + ' updated with value ' + value)
    this.state[key] = value
    this.state.watcher = value + String(new Date)
  },
  getValueByKey(key, value) {
    if (this.debug) console.log('key ' + key + ' recieved with value ' + value)
    return this.state[key]
  }
}

export const vNodeStore = {
  state: {
    // root: null,
    // watcher: ''
  },
  // setRoot(vueComponent) {
  //   this.state.root = vueComponent
  // },
  setComponent(key, component) {
    console.log('updated ', component)
    this.state[key] = component
  },
  getComponent(key) {
    return this.state[key]
  }
}