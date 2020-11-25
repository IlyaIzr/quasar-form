export const config = {
  fields: [
    // {
    //   key: 'select', type: 'select', rowIndex: 1,
    //   options: [
    //     { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' }, { name: 'C', id: 'cletter' }
    //   ],
    //   label: 'false'

      // onInput(vnode, value, m, vNodeStore) {
      //   const sel2 = vNodeStore.get('select2')
      //   console.log(sel2)
      //   console.log(sel2.value)
      // },
    // },
    {
      key: 'select2', type: 'number', rowIndex: 2,
      value: 15,
      // label: 'init label',
      // required: true,
    },
    // {
    //   onInput(v, val, m, store) {
    //     const sel2 = store.get('select2')
    //     sel2.clear()
    //   }
    // }
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