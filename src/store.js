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
  getSelectValue(key) {
    const obj = { value: this.state[key].id, label: this.state[key].name }
    return obj
  },
  updateSelectValue(key, obj) {
    const toSet = obj.value ? { id: obj.value, name: obj.label } : ''
    this.state[key] = toSet
    this.state.watcher = value + String(new Date)
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