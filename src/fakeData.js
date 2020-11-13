export const config = {
  fields: [

    //Select with async methods
    {
      type: 'select', rowIndex: 1, key: 'sel1base',
      label: 'Группа',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      value: '2aaaZ',
      async onInput(vNode, value, methods, vNodeStore) { // methods - quasar API methods

        //Request example
        const props = await {label: 'testo', visible: true}
          const vTarget = vNodeStore.getComponent('select2')
          vTarget.setConfig(props)
          console.log(vTarget)
          // vTarget.setOptions(options)
      }
    },
    {
      type: 'select', rowIndex: 2, key: 'select2',
      visible: false,
      label: 'Select 2',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      value: ''
    },
  ],


  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'сбросить' },  // reset button not required
    { type: 'close', label: 'x' },
  ],

  form: {
    async onSubmit(vNode, data, formMethods) {
      // console.log('submited', vNode)
      console.log('submited', data)
      // // vNode.onReset()
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    async onClear(vNode, data, formMethods) {
      // console.log('reseted form', vNode)
      // const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now

      // function cb(vNode) {
      //   console.log('callback function')
      // }
      // return { exeptionKey, cb }
    },
    async onValidateSuccess(vNode, data, formMethods) {
      console.log('validated form')
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    async onValidateError(vNode, data, formMethods, errorComponent) {
      console.log('validation error', errorComponent)
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    // Component lifecycle method
    async onMount(vNode, formMethods) {
      formMethods.focus()
      // return function (vNode) {
      //   console.log('callback function')
      // }
    }
  },

  title: 'Form title'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}