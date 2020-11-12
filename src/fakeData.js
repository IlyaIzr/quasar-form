export const config = {
  fields: [

    {
      type: 'textarea', rowIndex: 1, key: 'texto1',
      value: 'Hello',
      label: 'Parent field',
      async onInput(vNode, value, methods, vNodeStore) {
        const otherField = vNodeStore.getComponent('texto2')
        // const otherField = vNodeStore.get('texto2') // Same as getComponent(fieldKey)
        const props = {
          label: 'New label',
          disable: true
        }
        return function (vNode) {
          // otherField.setProp('disable', true) //setProp(propName, propValue). Arg1 - prop name, arg2 - prop value          
          otherField.setProp(props) // Arg1 - object of { propName: propValue }
        }
      },
    },
    {
      type: 'text', rowIndex: 2, key: 'texto2', label: 'Child field',
    }
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