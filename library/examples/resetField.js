const config = {
  fields: [
    {
      key: 'select', type: 'select', rowIndex: 1,
      options: [
        { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' }, { name: 'C', id: 'cletter' }
      ],
      value: 'bletter',
      onInput(vnode, value, m, vNodeStore) {
        const sel2 = vNodeStore.get('select2')
        sel2.setOptions([ { name: 'A', id: 'aletter' },])
        sel2.setValue('aletter')
        sel2.setConfig('label', 'new Lablo')
      },
    },
    {
      key: 'select2', type: 'select', rowIndex: 2,
      options: [
        { name: 'Oldo 1', id: 'o1' }, { name: 'Oldo 2', id: 'o2' }
      ],
      value: 'o2',
      label: 'init label'
    },
    {
      onInput(v, val, m, store){        
        const sel2 = store.get('select2')
        sel2.reset()
      }
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