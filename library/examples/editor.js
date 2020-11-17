const config = {
  fields: [
    {
      type: 'editor', key: 'edt14',
      value: '<b>B</b>eniss',
      placeholder: 'Type here',
      readonly: false,
      disable: false,
      minHeight: '150px',
      maxHeight: '60vh',
      height: '100%',
      toolbar: [
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike'],
        ['undo', 'redo'],
      ]
      // Quasar methods https://quasar.dev/vue-components/editor#QEditor-API
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

  title: 'Editor mode'
}