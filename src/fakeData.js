export const config = {
  fields: [
    //Common input properties. Not including type: "Multiple"
    {
      type: 'text', rowIndex: 2, key: 'as24a',
      tabIndex: 1,  // Index of Tab aka Wizard. Starting from 1
      // visible: false, //true by default
    },
    {
      type: 'text', rowIndex: 2, key: 'as24a1й2',
      tabIndex: 1,  // Index of Tab aka Wizard. Starting from 1
      // visible: false, //true by default
    },
    {
      type: 'text', rowIndex: 2, key: 'as24a15125',
      tabIndex: 2,  // Index of Tab aka Wizard. Starting from 1
      // visible: false, //true by default
    },
    
    {
      type: 'text', rowIndex: 2, key: 'a11',
      tabIndex: 2,  // Index of Tab aka Wizard. Starting from 1
      // visible: false, //true by default
    },
    
  ],


  form: {
    async onSubmit(vNode, data, formMethods) {
      console.log('submited', data)
    },
    async onValidateError(vNode, data, formMethods, errorComponent) {
      console.log('validation error', errorComponent)
    },
  },
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
    validateTabNavigation: false,
    validateButtonNavigation: false,
  },
  
  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'reset' },  // reset button not required
    { type: 'close', label: 'x' },
  ],

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}