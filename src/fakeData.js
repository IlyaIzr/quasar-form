export const config = {
  fields: [
    
    {
      type: 'date', key: 'date', rowIndex: 2, 
      range: true,
      value: { start: '11.12.2012', finish: '13.12.2012' },
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