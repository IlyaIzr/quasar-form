const config = {
  fields: [
    {
      type: 'multiple', key: 'multiKey', rowIndex: 4,
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
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
  ],


  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {

      // Get all mullti children
      const siblings = vNodeStore.getMultiSiblings('field1key', 'multiKey')
      typeof siblings // Array (of vNodes siblings)

      // Get single mullti children

      const multiRow = 0
      const singleMultipleField = vNodeStore.getComponent('field1key', 'multiKey', multiRow)
      typeof singleMultipleField // Object (vNode)

      singleMultipleField.setConfig('label', 'new label')
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