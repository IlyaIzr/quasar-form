export const config = {
  fields: [
    // Text input
    {
      type: 'text', rowIndex: 3, key: '2421as',
      tabIndex: 1,
      label: 'Test',
      required: true,
      rules: [val => val.length <= 12 || "Please use maximum 12 characters"],  //https://quasar.dev/vue-components/input#Async-rules
      mask: '##,##', // See https://quasar.dev/vue-components/input#Mask
      fillMask: '*', // Каким символом заполнить ещё не ввёденные символы маски
      reverseFill: true, // Заполнение будет происходить справа налево
      clearable: true,
      prefix: 'dev.',
      suffix: '@gmail.com',
      hint: 'helper-message'
    },
    // Text area
    {
      type: 'textarea', key: 'textoarea',
      required: true,
      tabIndex: 2,
      autogrow: true, // true by default
    }
  ],

  tabs: {
    steps: [
      { title: 'First', icon: 'settings' },
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' }
    ],
    buttons: {
      nextButton: { text: 'next step' },
      backButton: false,
      submitButton: {text: 'send'},
      resetButton: false
    }
  },


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