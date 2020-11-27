export const config = {
  fields: [
    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
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
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
  ],


  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      const f1 = vNodeStore.getMultiSiblings('field1key', 'multi21', 2)
      console.log(f1)
      // f1.setConfig('label', 'WTF')
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