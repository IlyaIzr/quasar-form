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
    
    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
      value: [
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
      label: 'Somelong shittybang!',
      shouldAddPreviousValue: false,
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
    
    {
      type: 'multiple', key: 'multi21', rowIndex: 5,
      value: [
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
      label: 'Somelong shittybang!',
      shouldAddPreviousValue: false,
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },

  ],

  modal1: {  //Nothing is required
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