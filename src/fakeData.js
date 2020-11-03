export const config = {
  fields: [
    //1
    {
      type: 'select', rowIndex: 2, key: 'sel1base',
      label: '@(Группа)',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      required: true,
    },

    {
      type: 'email', rowIndex: 1, key: 'accountsKey42222',
      label: 'Mail',
    },

    {
      type: 'text', rowIndex: 2, key: '2421as',
      label: 'Test',
      rules: [val => val.length <= 3 || "Please use maximum 3 characters"]  //array of functions of rules
    },

    // Universal event handlers
    {
      type: 'text', rowIndex: 3, key: '24assa21as',
      label: 'Event Handlers',

      async onBlur(vNode, event, methods, vNodeStore) {
        console.log('blur happend')
        let res = 'this was blurred'
        // optional
        return function (vNode) {
          console.log('callback function')
          vNode.input(res)
        }
      },

      async onInput(vNode, value, methods, vNodeStore) {
        console.log('input happend')
        return function (vNode) {
          console.log('callback function')
        }
      },

      async onFocus(vNode, value, methods, vNodeStore) {
        console.log('focus happend')
        console.log(vNode)
        return function (vNode) {
          console.log('callback function')
        }
      }
    }
  ],


  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'сбросить' }  // reset button not required
  ],

  form: {
    isModal: false,
    //Form events
    async onSubmit(vNode, data, formMethods) {
      console.log('submited', vNode)
      console.log('submited', data)
      // vNode.onReset()
      return function (vNode) {
        console.log('callback function')
      }
    },
    async onClear(vNode, data, formMethods) {
      console.log('reseted form', vNode)
      const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now

      function cb(vNode) {
        console.log('callback function')
      }
      return { exeptionKey, cb }
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
    async onMount(vNode, formMethods){
      formMethods.focus()
      return function (vNode) {
        console.log('callback function')
      }
    }
  },

  title: 'Form title'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}