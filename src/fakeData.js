export const config = {
  fields: [
    
    {
      label: "Аккаунты neteller",
      key: "netellers",
      type: "selectCreatable",
      required: false,
      outlined: true,
    },
    {
      label: "Аккаунты skrill",
      key: "skrills",
      type: "selectCreatable",
      outlined: true,
    },
    

  ],


  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('subbed', data)
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
    fullHeigh: true,
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