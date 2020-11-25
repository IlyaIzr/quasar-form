export const config = {
  fields: [
    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' }, { name: 'C', id: 'cletter' }
      ],
      label: 'false',

      onInput(vnode, value, m, vNodeStore) {
        const sel2 = vNodeStore.get('select2')
        sel2.setConfig('label', 'new label')
      },
    },
    {
      key: 'select2', type: 'text', rowIndex: 2,
      value: 15,
      label: 'init label',
      // required: true,
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