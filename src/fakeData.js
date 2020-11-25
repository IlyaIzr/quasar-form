export const config = {
  fields: [
    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'Ab 1', id: 'aletter' }, { name: 'Bd 2', id: 'bletter' }, { name: 'Cs 3', id: 'cletter' }, { name: 'Dd 3', id: 'dletter' }
      ],
      label: 'Pesting',
      autocomplete: true,
      multiple: true,
      value: ['cletter', 'dletter']
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
  
  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'reset' },  // reset button not required
    { type: 'close', label: 'x' },
  ],

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}