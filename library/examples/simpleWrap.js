const config = {
  fields: [
    {
      rowIndex: 1, label: 'no wrpap'
    },
    {
      rowIndex: 2, label: 'wrpap us'
    },
    {
      rowIndex: 3, label: 'wrpap us'
    },
    {
      rowIndex: 4, label: 'not completed wrap'
    },
  ],

  wrap: [[2, 3], [4, 5, 6]],

  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('subbed', data)
    },
    async onValidateError(vNode, data, formMethods, errorComponent, vNodeStore) {
      console.log('validation error', errorComponent)
    },
  },

  title: 'Simple wrap'
}
