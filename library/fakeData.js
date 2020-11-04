export const config = {
  fields: [
    //1
    {
      type: 'select', rowIndex: 1, key: 'sel1base',
      label: '@(Группа)',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      value: '2aaaZ',
      async onInput(vNode, value, methods, vNodeStore) { // methods - quasar API methods

        //Request example
        const { status, data, options } = await WS.send('transactions2', 'usersDataSenders', value)
        if (status === 'OK') {
          const vTarget = vNodeStore.getComponent('sendersKey132')
          vTarget.onInput(data)
          vTarget.setOptions(options)
        }
      }
    },
    {
      type: 'select', rowIndex: 2, key: 'sendersKey132', // required
      label: '@(Отправитель)',
      options: [],
      rules: [val => val || 'Please select option']
    },

    {
      type: 'text', rowIndex: 3, key: '2421as',
      label: 'Test',
      rules: [val => val.length <= 3 || "Please use maximum 3 characters"]  //https://quasar.dev/vue-components/input#Async-rules
    },

    // Universal event handlers
    {
      type: 'text', rowIndex: 3, key: '24assa21as',
      label: 'Event Handlers',

      async onBlur(vNode, event, methods, vNodeStore) { // methods - quasar API methods
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
    },

    // Checkbox
    { //onInput event only
      type: 'checkbox', key: 'testCheckBox',
      label: 'Agreed?',
      value: true
    },

    // Slider
    { //no onFocus event
      type: 'slider', key: 'slid1e31',
      label: 'Do be do',
      value: 50, max: 100, min: 1,
      showValue: false
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
    async onMount(vNode, formMethods) {
      formMethods.focus()
      return function (vNode) {
        console.log('callback function')
      }
    }
  },
  
  modal: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    opened: false, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    fullWidth: false,
    fullHeigh: true,
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
  },

  title: 'Form title'

}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}