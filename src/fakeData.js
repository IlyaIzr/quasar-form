export const config = {
  fields: [

    {
      type: 'text', rowIndex: 1, key: 'text1',
      label: 'Hello',
    },
    {
      type: 'text', rowIndex: 2, key: 'text2', tabIndex: 2, visible: false
    },
    //Select with async methods
    {
      type: 'select', rowIndex: 2, key: 'sel1base', tabIndex: 2,
      label: 'Группа',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      async onInput(vNode, value, methods, vNodeStore) { // methods - quasar API methods
        const vTarget = vNodeStore.getComponent('text2')
        vTarget.setConfig('visible', true)
      },
      required: true
    },
  ],

  tabs: {
    steps: [
      { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' },
    ],
    buttons: {  //Ovverrides default buttons
      next: { text: 'next step' },
      back: { text: 'go back', color: 'yellow', textColor: 'black' },
      submit: { text: 'send' },
      reset: false
    },
    tabNavigation: true,  //User can click on tabs
    validateTabNavigation: true,
    validateButtonNavigation: true,
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