export const config = {
  fields: [
    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
      value: [
        { 'field1key': 'Peter', select12: 'option2',  },
        // { 'field1key': '', select12: '',  }
      ],
      fields: [
        { type: 'text', rowIndex: 1, key: 'field1key', label: 'Name', service: false, },
        {
          type: 'select', rowIndex: 2, key: 'select12', label: 'Choose', service: true,
          options: [
            { id: 'option1', name: 'Your kids go to college' },
            { id: 'option2', name: 'Batman glass' },
            { id: 'option3', name: 'Meg' }
          ]
        },
        { type: 'date', rowIndex: 1, key: 'dateKey', label: 'When?', withInput: true, range: true }
      ],
      label: 'Multy fields!',
      buttons: {
        addField: { text: 'add', color: 'green', textColor: 'white' },
        deleteField: { text: 'x', color: 'red', textColor: 'black', disabled: false }
      },
      shouldAddPreviousValue: false,
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 1 || 'Select at least 1 field']
    },
    {
      key: 'testo', service: true, value: 'bob'
    }

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