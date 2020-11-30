export const config = {
  fields: [
    //Multiple fields
    {
      value: '2', hint: 'constant lavehintl',
      onInput(node, val, m, vstore) {
        const f = vstore.get('12')
        f.setConfig('hint', 'new HHHint!')
      },
    },
    {
      key: '12'
    },
    
    {
      tabIndex: 2, value: '11', key: '42'
    }
  ],

  // Tabs aka Stepper aka Wizard  
  tabs: {
    steps: [
      { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' }
    ],
    buttons: {  //Ovverrides default buttons
      next: { text: 'next step' },
      back: { text: 'go back', color: 'yellow', textColor: 'black' },
      submit: { text: 'send' },
      reset: false,
      clear: false
    },
    tabNavigation: true,  //User can click on tabs
    validateTabNavigation: true,
    validateButtonNavigation: false,
  },

  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('subbed', data)
    },
    async onValidateError(vNode, data, formMethods, errorComponent, vNodeStore) {
      console.log('validation error', errorComponent)
    },
  },

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}