const config = {
  fields: [

    {
      value: 'anton',
      onInput(vnode, value, m, vNodeStore) {
        const dateField = vNodeStore.get('date')
        dateField.setValue('11.12.2012')
        vnode.setValue(value + '*')
      }
    },

    {
      key: 'selectF', type: 'select', rowIndex: 2,
      options: [
        { name: 'A', id: 'aletter' }, { name: 'B', id: 'bletter' }, { name: 'C', id: 'cletter' }
      ],
      value: 'bletter',
      onInput(vnode, value, m, vNodeStore) {
        vnode.setValue('cletter')
      },
    },

    {
      type: 'date', key: 'date', rowIndex: 2, value: '16.03.1995',
      onInput(vnode, value, m, vNodeStore) {
        vnode.setValue('12.12.2012')  //set self
      }
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

  title: 'Set values'
}