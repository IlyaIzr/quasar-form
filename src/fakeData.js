export const config = {
  fields: [
    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
      value: [
        { 'field1key': 'Peter', select12: 'option2', dateKey: '2012/12/12' },
        { 'field1key': 'Lois', select12: 'option1', dateKey: '2020/12/12' }
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