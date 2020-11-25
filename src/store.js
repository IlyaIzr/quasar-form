const killObservers = data => {
  if (typeof data === 'object' && data && data.length === undefined) {  //case: object
    data = { ...data }
    delete data.__ob__
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach(key => {
        let res = killObservers(data[key])
        delete res.__ob__
        data[key] = res
      })
    }
  }
  if (typeof data === 'object' && data && data.length !== undefined) {  //case: array
    data = [...data]
    delete data.__ob__
    if (data.length > 0) {
      data.forEach((arrItem, index) => {
        let res = killObservers(arrItem)
        delete res.__ob__
        data[index] = res
      })
    }
  }
  return data
}
export const store = {
  debug: false,
  state: {
    watcher: 'a'
  },
  updateKeyValue(key, value, multiKey = "", fieldNumber = "") {
    if (typeof value === 'object' && value && value.length === undefined) value = { ...value }  //skip obj observer
    if (typeof value === 'object' && value && value.length !== undefined) value = [...value]  //skip arr observer
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved value`, value)
      this.state[key] = value
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} with `, value)
      // this thingy stops from making observers
      this.state[multiKey] = [...this.state[multiKey]]
      this.state[multiKey][fieldNumber] = { ...this.state[multiKey][fieldNumber] }
      this.state[multiKey][fieldNumber][key] = value
    }
    this.state.watcher = value + String(new Date)
  },
  updateFile(key, value, multiKey = "", fieldNumber = "") {
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved value`, value)
      this.state[key] = value
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} with `, value)
      // this thingy stops from making observers
      this.state[multiKey] = [...this.state[multiKey]]
      this.state[multiKey][fieldNumber] = { ...this.state[multiKey][fieldNumber] }
      this.state[multiKey][fieldNumber][key] = value
    }
    this.state.watcher = value + String(new Date)
  },
  getValueByKey(key, multiKey = "", fieldNumber = "") {
    let value
    if (!multiKey) {
      value = this.state[key]
    } else {
      value = this.state[multiKey] && this.state[multiKey][fieldNumber] && this.state[multiKey][fieldNumber][key]
    }
    if (this.debug) console.log('key ' + key + ' request recieved. Its value ', value)
    // if (!multiKey) console.log('key ' + key + ' request recieved. Its value ', value)
    return value
  },
  getStore() {
    const res = killObservers(this.state)
    return res
  },
  deleteMultiField(multiKey, fieldNumber) {
    if (this.debug) console.log(`field ${fieldNumber} was deleted from multikey ${multiKey}`)
    const n = [...this.state[multiKey]]
    n.splice(fieldNumber, 1)
    this.state[multiKey] = n
    this.state.watcher = 'deleted' + multiKey + String(new Date)
  },
  clearStore(exeptionKey = '') {
    if (this.debug) console.log('store was reseted')
    // let empty = {}
    for (const [key, value] of Object.entries(this.state)) {
      if (key === 'watcher') this.state.watcher = 'empty' + String(new Date)
      else if (key !== exeptionKey) this.state[key] = ""
    }
  }
}
export const optionsStore = {
  debug: false,
  state: {},
  setOptions(key, options, multiKey = "", fieldNumber = "") {
    if (!multiKey) {
      if (this.debug) console.log(`key ${key} recieved options`, options)
      this.state[key] = options ? [...options] : []
    } else {
      // if (this.debug) 
      console.log(`multiKeys ${multiKey} field ${fieldNumber} updated key ${key} options`, options)
      this.state[multiKey] = []
      this.state[multiKey][fieldNumber] = []
      this.state[multiKey][fieldNumber][key] = options
    }
  },
  getOptions(key, multiKey = "", fieldNumber = "") {
    let value
    if (!multiKey) {
      value = this.state[key] || []
    } else {
      value = this.state[multiKey] && this.state[multiKey][fieldNumber] && this.state[multiKey][fieldNumber][key] || []
      let value2 = this.state
      console.log(value2)
    }
    if (this.debug) console.log('key ' + key + ' request for options recieved. They are: ', value)
    return [...value]
  },
  reset() {
    this.state = {}
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
  },
  get(key) {
    return this.getComponent(key)
  },
  resetComponents(){    
    for (const [key] of Object.entries(this.state)) {
      this.state[key].$children[0].reset()
    }
  }
}