export const config = {
  fields: [

    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' }, { name: 'C', id: 'cletter' }
      ],
      value: 'bletter',
      onInput(vnode, value, m, vNodeStore) {
        const sel2 = vNodeStore.get('select2')
        console.log(sel2)
        sel2.setOptions([ { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' },])
      },
    },
    {
      key: 'select2', type: 'select', rowIndex: 2,
      options: [],
    },
  ],

  tabs: {
    steps: [
      { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' }
    ],
    buttons: {  //Ovverrides default buttons
      next: { text: 'next step' },
      back: { text: 'go back', color: 'yellow', textColor: 'black' },
      submit: { text: 'send' },
      reset: false
    },
    tabNavigation: true,  //User can click on tabs
    validateTabNavigation: true,
    validateButtonNavigation: false,
  },

  form: {
    async onSubmit(vNode, data, formMethods) {
      console.log('submited', data)
    },
    async onValidateError(vNode, data, formMethods, errorComponent) {
      console.log('validation error', errorComponent)
    },
  },

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}