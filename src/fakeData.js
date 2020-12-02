export const config = {
  fields: [
    {
      type: 'multiple', key: 'multiKey', rowIndex: 4,
      value: [
      ],
      fields: [
        {
          type: 'text', rowIndex: 1, key: 'field1key', label: 'Name', outlined: true, append: 'event',
          async appendOnClick(vNode, value, ref, vNodeStore) {
            console.log(vNode)
            vNode.setConfig('visible', false)
          }
        },
        { key: 'p', rowIndex: 1, label: 'some pe', filled: true, type: 'password' }
      ],
      label: 'Multy fields!',
      buttons: {
        addField: { text: '+', color: 'green', textColor: 'white' },
        deleteField: { text: 'x', color: 'red', textColor: 'black', disabled: false }
      },
      shouldAddPreviousValue: false,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
  ],

  modal1: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    fullWidth: true,
    fullHeigh: true,
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
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