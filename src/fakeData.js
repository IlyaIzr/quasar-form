export const config = {
  fields: [
    {
      value: 'peps'
    },
    {
      type: 'multiple', key: 'multiKey', rowIndex: 4, tabIndex: 2,
      value: [
        { 'field1key': 'Peter',  },
        { 'field1key': 'Lois',  }
      ],
      fields: [
        { type: 'text', rowIndex: 1, key: 'field1key', label: 'Name' },
      ],
      label: 'Multy fields!',
      buttons: {
        addField: { text: 'add', color: 'green', textColor: 'white' },
        deleteField: { text: 'x', color: 'red', textColor: 'black', disabled: false }
      },
      shouldAddPreviousValue: false,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
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
    async onSubmit(vNode, data, formMethods, vNodeStore, cs) {
      const f = vNodeStore.get('field1key', 'multiKey')
      f.setConfig('hint', 'NEW HINT PETA')
      f.setConfig('label', 'NEW LABEL PETA')
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