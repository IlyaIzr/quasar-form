export const config = {
  fields: [
    // Date    
    {
      type: 'date', key: 'afs', rowIndex: 8,
      label: 'some cal', mini: false,
      color: 'orange',
      withInput: true, // true by default
      localization: 'ru', // 'ru' or 'en' or {} of localisation. See https://quasar.dev/vue-components/date#Custom-ad-hoc-locale
      mask: 'DD.MM.YYYY', //calendar mask. Должна совпадать с форматом даты. Указано значение по умолчанию
      // range: false,
      // inputMask: '##.##.####', //default value
      // value: '12.12.2012',
      range: true,
      value: { start: '11.12.2012', finish: '13.12.2012' },
      inputMask: '##.##.#### - ##.##.####', // default value
      defaultYearMonth: '2020/10',
      defaultView: 'Calendar', // 'Calendar' | 'Months' |'Years'
      navigationMinYearMonth: '2010/01',
      navigationMaxYearMonth: '2030/01',
      readonly: false,
      disable: false
    },
  ],


  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'сбросить' },  // reset button not required
    { type: 'close', label: 'x' },
  ],

  form: {
    async onSubmit(vNode, data, formMethods) {
      // console.log('submited', vNode)
      console.log('submited', data)
      // // vNode.onReset()
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    async onClear(vNode, data, formMethods) {
      // console.log('reseted form', vNode)
      // const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now

      // function cb(vNode) {
      //   console.log('callback function')
      // }
      // return { exeptionKey, cb }
    },
    async onValidateSuccess(vNode, data, formMethods) {
      console.log('validated form')
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    async onValidateError(vNode, data, formMethods, errorComponent) {
      console.log('validation error', errorComponent)
      // return function (vNode) {
      //   console.log('callback function')
      // }
    },
    // Component lifecycle method
    async onMount(vNode, formMethods) {
      formMethods.focus()
      // return function (vNode) {
      //   console.log('callback function')
      // }
    }
  },

  modal: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    opened: true, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    fullWidth: false,
    fullHeigh: true,
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
  },
  title: 'Form title'
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}