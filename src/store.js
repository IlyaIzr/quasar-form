export const store = {
  debug: true,
  state: {
    watcher: 'a'
  },
  updateKeyValue(key, value, multiKey = "", fieldNumber = "") {
    if (typeof value === 'object' && value) value = { ...value }  //skip observer
    if (!multiKey) {
      // console.log('simple case with key ', key)
      this.state[key] = value
    } else {
      // this thingy stops from making observer
      this.state[multiKey] = {...this.state[multiKey]}
      this.state[multiKey][fieldNumber] = {...this.state[multiKey][fieldNumber]}
      this.state[multiKey][fieldNumber][key] = value      
    }
    this.state.watcher = value + String(new Date)
  },
  getValueByKey(key, multiKey = "", fieldNumber = "") {
    // if (this.debug) console.log('key ' + key + ' request recieved ')
    if (!multiKey) {
      return this.state[key]
    } else {
      return this.state[multiKey] && this.state[multiKey][fieldNumber] && this.state[multiKey][fieldNumber][key]
    }
  },
  deleteMultiField(multiKey, fieldNumber){
    const n = {...this.state[multiKey]}
    n[fieldNumber] = undefined
    delete n[fieldNumber]
    console.log(n)
    this.state[multiKey] = n
    this.state.watcher = 'deleted' + multiKey + String(new Date)
  },
  resetStore(exeptionKey = '') {
    if (this.debug) console.log('store was reseted')
    // let empty = {}
    for (const [key, value] of Object.entries(this.state)) {
      if (key === 'watcher') this.state.watcher = 'empty' + String(new Date)
      else if (key !== exeptionKey) this.state[key] = ""
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