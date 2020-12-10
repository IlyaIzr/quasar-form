export const config = {
  fields: [
    {
      rowIndex: 1
    },
    {
      rowIndex: 1
    },
    {
      rowIndex: 1
    },
    {
      rowIndex: 1
    },
    {
      key: 'testo', service: true, value: 'bob', rowIndex: 2
    },
    {
      label: '3', rowIndex: 3
    },
    {
      rowIndex:5
    },
    {
      rowIndex:6
    },
    {
      rowIndex:7
    },
    {
      rowIndex:8
    },
    
    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
      value: [
        { 'field1key': 'Peter', select12: 'option2', dateKey: '20.12.2012' },
        { 'field1key': 'Lois', select12: 'option1', dateKey: '20.12.2020' }
      ],
      fields: [
        { type: 'text', rowIndex: 1, key: 'field1key', label: 'Name' },
        {
          type: 'select', rowIndex: 2, key: 'select12', label: 'Choose',
          options: [
            { id: 'option1', name: 'Your kids go to college' },
            { id: 'option2', name: 'Batman glass' },
            { id: 'option3', name: 'Meg' }
          ]
        },
        { type: 'date', rowIndex: 1, key: 'dateKey', label: 'When?' }
      ],
      label: 'Multy fields!',
      buttons: {
        addField: { text: 'add', color: 'green', textColor: 'white' },
        deleteField: { text: 'x', color: 'red', textColor: 'black', disabled: false }
      },
      shouldAddPreviousValue: false,
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },

  ],

  modal: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    opened: true, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    fullWidth: true,
    fullHeigh: true,
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
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