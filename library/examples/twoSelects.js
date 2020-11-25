const config = {
  fields: [

    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'Ab 1', id: 'aletter' }, { name: 'Bd 2', id: 'bletter' }, { name: 'Cs 3', id: 'cletter' }, { name: 'Dd 3', id: 'dletter' }
      ],
      label: 'Pesting',
      autocomplete: true,
      multiple: true,
      value: ['cletter', 'dletter'],
      onInput(vnode, value, m, vNodeStore) {
        const sel2 = vNodeStore.get('select2')
        console.log(sel2)
        sel2.setOptions([{ name: 'A', id: 'aletter' },])
      },
    },
    {
      key: 'select2', type: 'select', rowIndex: 2,
      options: [
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