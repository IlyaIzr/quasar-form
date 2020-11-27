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
  setComponent(key, component, multiKey = "", fieldNumber = 0) {  //sorter component, parent to input
    if (!multiKey) {
      if (this.debug) console.log(`component ${key} recieved vNode`)
      this.state[key] = component
    } else {
      if (this.debug) console.log(`multiKeys ${multiKey} field ${fieldNumber} updated component with key ${key}`, component)
      if (!this.state[multiKey].multiChildren) this.state[multiKey].multiChildren = []
      this.state[multiKey].multiChildren[fieldNumber] = { ...this.state[multiKey].multiChildren[fieldNumber] }
      this.state[multiKey].multiChildren[fieldNumber][key] = component
      // console.log('store of mKey now: ', this.state[multiKey].multiChildren)
    }
  },
  getComponent(key, multiKey = "", fieldNumber = 0) { //  child input component
    let value
    if (!multiKey) {
      value = this.state[key].$children[0]
    } else {
      value = this.state[multiKey]?.multiChildren?.[fieldNumber]?.[key]?.$children[0]
    }
    if (this.debug) console.log('key ' + key + ' request for options recieved. They are: ', value)
    return value
  },
  get(key, multiKey, fieldNumber) {
    return this.getComponent(key, multiKey, fieldNumber)
  },
  getMultiSiblings(key, multiKey) {
    let res = []
    const multiParentStore = this.state[multiKey]?.multiChildren
    multiParentStore?.map((children) => {
      if (children.hasOwnProperty(key)) res.push(children[key])
    })
    if (res.length) return res
    else return null
  },
  resetComponents() {
    for (const [key] of Object.entries(this.state)) {
      this.state[key].$children[0].reset()
    }
  }
}