export const config = {
  fields: [

    {
      key: 'selectF', type: 'select', rowIndex: 2,
      options: [
        { name: 'Anto 13', id: 'aletter' }, { name: 'B 52', id: 'bletter' }, { name: 'Cinnabon', id: 'cletter' }
      ],
      
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

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}