export const config = {
  fields: [
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
    }

  ],

  wrap: [[1, 2]],

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