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
  },
  resetStore() {
    if (this.debug) console.log('store was reseted')
    // let empty = {}
    for (const [key, value] of Object.entries(this.state)) {
      if (key === 'watcher') this.state.watcher = 'empty' + String(new Date)
      else this.state[key] = ""
    }
  }
}

export const vNodeStore = {
  debug: false,
  state: {
    // root: null,
    // watcher: ''
  },
  setComponent(key, component) {  //sorter component, parent to input
    if (this.debug) console.log('updated ', component)
    this.state[key] = component
  },
  getComponent(key) { //  child input component
    return this.state[key].$children[0]
  }
}