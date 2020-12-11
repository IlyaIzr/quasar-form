export const config = {
  fields: [
    {
      rowIndex: 1, service: true, value: 'cant submit',
      onInput(v, value, m, vNodeStor){
        const html = vNodeStor.get('html')
        html.setValue('Mega Peter says ' + v.value)
      }
    },
    {
      rowIndex: 1,
      required: false
    },
    {
      rowIndex: 1,
      required: false
    },
    {
      rowIndex: 1,
      required: false
    },
    {
      key: 'testo', service: true, value: 'bob', rowIndex: 2,
      required: false
    },
    {
      type: 'html', value: 'Pete<b>r</b>', key: 'html'
    },
    
    

  ],

  modal1: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    opened: true, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    fullWidth: true,
    fullHeigh: true,
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
  },

  form: {
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('subbed', data)
    },
    async onValidateError(vNode, data, formMethods, errorComponent, vNodeStore) {
      console.log('validation error', errorComponent)
    },
  },

  title: 'Development mode'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}