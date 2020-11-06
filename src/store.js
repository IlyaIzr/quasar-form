export const store = {
  debug: false,
  state: {
    watcher: 'a'
  },
  updateKeyValue(key, value, multiKey = "", fieldNumber = "") {
    if (typeof value === 'object' && value && value.length === undefined) value = { ...value }  //skip obj observer
    if (typeof value === 'object' && value && value.length !== undefined) value = [ ...value ]  //skip arr observer
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved value`, value)      
      this.state[key] = value
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} with `, value)
      // this thingy stops from making observers
      this.state[multiKey] = [ ...this.state[multiKey] ]
      this.state[multiKey][fieldNumber] = { ...this.state[multiKey][fieldNumber] }
      this.state[multiKey][fieldNumber][key] = value
    }
    this.state.watcher = value + String(new Date)
  },
  getValueByKey(key, multiKey = "", fieldNumber = "") {
    if (this.debug) console.log('key ' + key + ' request recieved. Its value ', value)
    if (!multiKey) {
      const value = this.state[key]
      return value
    } else {
      return this.state[multiKey] && this.state[multiKey][fieldNumber] && this.state[multiKey][fieldNumber][key]
    }
  },
  getStore(){
    const res = this.state
    return res
  },
  deleteMultiField(multiKey, fieldNumber) {
    if (this.debug) console.log(`field ${fieldNumber} was deleted from multikey ${multiKey}`)
    const n = [ ...this.state[multiKey] ]
    n.splice(fieldNumber, 1)
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