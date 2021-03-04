export const config = {
  fields: [


    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'Ab 1', id: 'aletter' }, { name: 'Bd 2', id: 'bletter' }, { name: 'Cs 3', id: 'cletter' }, { name: 'Dd 3', id: 'dletter' }
      ],
      label: 'Pesting',
      writable: true,
      multiple: true,
      value: ['cletter', 'dletter'],
      onInput(vnode, value, m, vNodeStore) {
        const sel2 = vNodeStore.get('select2')
        console.log(sel2)
        sel2.setOptions([{ name: 'A', id: 'aletter' },])
      },
    },
    {
      key: 'select2', type: 'select', rowIndex: 2,
      options: [
      ],
    },

  ],

  global: {
    label: 'Global default label',
    hint(config){
      return String (new Date)
    },
    type(){return 'password'},
    // tabs: {
    //   buttons: 'aaa'
    // },
    // fields: {
    //   label: 'a'
    // },
  },

  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('subbed', data)
      // vNode.clear()
    },
    async onValidateError(vNode, data, formMethods, errorComponent, vNodeStore) {
      console.log('validation error', errorComponent)
    },
  },

  modal1: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    fullWidth: false,
    fullHeigh: false,
    opened: false, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
  },

  // Tabs aka Stepper aka Wizard  
  tabs1: {
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

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}