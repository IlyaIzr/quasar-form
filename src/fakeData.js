export const config = {
  fields: [
    // File
    {
      type: 'file', 
      label: 'Upload',
      hint: 'any image below 10000000mb',
      clearable: false // true by default
    }
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