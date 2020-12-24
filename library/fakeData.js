export const config = {
  fields: [

    //Common input properties. Not including type: "Multiple"
    {
      type: 'text', rowIndex: 2, key: 'as24a',
      tabIndex: 1,  // Index of Tab aka Wizard. Starting from 1
      visible: false, //true by default
      disable: true,
      value: "Can't touch this",
      required: true,
      requiredMessage: 'Fill the field', // Не знаю какое поставить по дефолту. Просто пустое?
      service: true, // - value not submited
    },

    // Text input
    {
      type: 'text', rowIndex: 3, key: '2421as',
      label: 'Test',
      rules: [val => val && val.length <= 12 || "Please use maximum 12 characters"],  //https://quasar.dev/vue-components/input#Async-rules
      mask: '###,###,###,###.##', // See https://quasar.dev/vue-components/input#Mask
      fillMask: '*', // Каким символом заполнить ещё не ввёденные символы маски
      reverseFill: true, // Заполнение будет происходить справа налево
      unmaskedValue: true, // Send value without mask. Example: 444,444.44 will be sent as '44444444'
      clearable: true,
      prefix: 'dev.',
      suffix: '@gmail.com',
      hint: 'helper-message',
      readonly: false,
      outlined: false,
      filled: false,
      prepend: 'event', //icon or img url
      // prependOnClick: ()=>{},
      append: 'https://cdn.quasar.dev/img/avatar5.jpg',
      async appendOnClick(vNode, value, ref, vNodeStore){
        vNode.setValue(value+'*')
      }
    },
    // Text area
    {
      type: 'textarea',
      autogrow: true, // false by default
    },

    //Select
    {
      type: 'select', rowIndex: 2, key: 'sendersKey132', // required
      label: '@(Отправитель)',
      options: [],
      rules: [val => val || 'Please select option'],
      readonly: false,
      clearable: false, // true by default
      autocomplete: false, // true by default
      noResultsMsg: 'No results', //autocomplete no-result message, 'Нет результатов' by default
      
      // multiple: true, // false by default
      // value: [],   // value HAS TO BE ARRAY if multiple true
    },

    //Select with async methods
    {
      type: 'select', rowIndex: 1, key: 'sel1base',
      label: 'Группа',
      options: [{ name: 'Alpha', id: '114aZ' }, { name: 'Beta', id: '2aaaZ' },],
      value: '2aaaZ',
      async onInput(vNode, value, methods, vNodeStore) { // methods - quasar API methods

        //Request example
        const { status, data, options } = await WS.send('transactions2', 'usersDataSenders', value)
        if (status === 'OK') {
          const vTarget = vNodeStore.getComponent('sendersKey132')
          vTarget.onInput(data)
          vTarget.setOptions(options)
          vTarget.clear()
          vTarget.reset()
          vTarget.value
        }
      }
    },

    //Html
    {
      type: 'html', key: 'data2', value: '<b>Bold</b> simple'
    },

    // Universal event handlers
    {
      type: 'text', rowIndex: 3, key: '24assa21as',
      label: 'Event Handlers',

      async onBlur(vNode, event, methods, vNodeStore, multiIndex) { // methods - quasar API methods
        console.log('blur happend')
        let res = 'this was blurred'
        // optional callback function
        return function (vNode) {
          console.log('callback function')
          vNode.input(res)
        }
      },

      async onInput(vNode, value, methods, vNodeStore, multiIndex) {
        const otherField = vNodeStore.getComponent('other Field Key') // alias vNodeStore.get('field Key')        
        const propsObject = {
          label: 'New label',
          disable: true
        }
        // setConfig() - set any config except value and options

        // otherField.setConfig('disable', true) //setConfig(propName, propValue). Arg1 - prop name, arg2 - prop value       
        otherField.setConfig(propsObject) // Arg1 - object of { propName: propValue }  

        otherField.setValue('123')
        otherField.setOptions([{ name: 'Adam', id: 1 }])  // for type: select only

        // return function (vNode) {          
        // }
      },

      async onFocus(vNode, value, methods, vNodeStore, multiIndex) {
        console.log('focus happend')
        console.log(vNode)
        return function (vNode) {
          console.log('callback function')
        }
      }
    },

    // Checkbox
    { //onInput event only
      type: 'checkbox', key: 'testCheckBox',
      label: 'Agreed?',
      value: true,
      rules: [val => val || 'Error message']
    },

    // Slider
    { //no onFocus event
      type: 'slider', key: 'slid1e31',
      label: 'Do be do',
      value: 50, max: 100, min: 1,
      showValue: false
    },

    // Editor 
    {
      type: 'editor',
      value: '<b>B</b>enis',
      placeholder: 'Type here',
      readonly: false,
      minHeight: '150px',
      maxHeight: '60vh',
    },

    // File
    {
      type: 'file',
      label: 'Upload',
      hint: 'any image below 10000000mb',
      clearable: false // true by default
    },

    // Date    
    {
      type: 'date', key: 'afs', rowIndex: 8,
      label: 'some cal', mini: false,
      color: 'orange',
      withInput: true, // true by default
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
      clearable: false // true by default
    },

    //Multiple fields
    {
      type: 'multiple', key: 'multi21', rowIndex: 4,
      value: [
        { 'field1key': 'Peter', select12: 'option2', dateKey: '20.12.2012' },
        { 'field1key': 'Lois', select12: 'option1', dateKey: '20.12.2020' }
      ],
      fields: [
        { type: 'text', rowIndex: 1, key: 'field1key', label: 'Name' },
        {
          type: 'select', rowIndex: 2, key: 'select12', label: 'Choose',
          options: [
            { id: 'option1', name: 'Your kids go to college' },
            { id: 'option2', name: 'Batman glass' },
            { id: 'option3', name: 'Meg' }
          ]
        },
        { type: 'date', rowIndex: 1, key: 'dateKey', label: 'When?' }
      ],
      label: 'Multy fields!',
      buttons: {
        addField: { text: 'add', color: 'green', textColor: 'white' },
        deleteField: { text: 'x', color: 'red', textColor: 'black', disabled: false }
      },
      shouldAddPreviousValue: false,
      // defaultAddValues: {} //TBD,
      rules: [val => val >= 2 || 'Select at least 2 fields']
    },
  ],


  buttons: [  // buttons NOT required
    {
      type: 'submit', // required IF buttons declared
      label: 'отправить', color: 'primary', class: 'customClassName' //not required
    },
    { type: 'reset', label: 'сбросить' },  // reset button not required
    { type: 'close', label: 'x' },    
    { type: 'clear', label: 'очистить' },  // not required
  ],
  
  noButtons: true, // no form buttons. false by default

  form: {
    //Form events
    async onSubmit(vNode, data, formMethods, vNodeStore) {
      console.log('submited', vNode)
      console.log('submited', data)
      // vNode.clear()  // Clear form
      // vNode.$q.notify({  // Any notification. See more https://quasar.dev/quasar-plugins/notify#Introduction
      //   color: "green-4",
      //   textColor: "white",
      //   icon: "cloud_done",
      //   message: "Submitted",
      //   position: 'bottom-right'
      // });      
      vNodeStore.closeModal()
      return function (vNode) {
        console.log('callback function')
      }
    },
    async onClear(vNode, data, formMethods) {
      console.log('reseted form', vNode)
      const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now

      function cb(vNode) {
        console.log('callback function')
      }
      return { exeptionKey, cb }
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
    async onMount(vNode, formMethods, vNodeStore) {
      formMethods.focus()
      return function (vNode) {
        console.log('callback function')
      }
    }
  },

  modal: {  //Nothing is required
    triggerButton: {
      label: 'run form', color: 'white', textColor: 'red'
    },
    fullWidth: false,
    fullHeigh: true,
    opened: false, // true by default if no 'opened' key provided
    persistent: true,  // rest if false by default. Можно ли закрыть кликом вне формы
    maximized: false,
    transitionShow: "slide-up", // one of https://quasar.dev/options/transitions
    transitionHide: "jump-right",
    seamless: false, // Можно ли взаимодействовать с контентом вне формы (по сторонам)
    position: 'left', // one of 'standard' 'top' 'right' 'bottom' 'left'
  },

  // Tabs aka Stepper aka Wizard  
  tabs: {
    steps: [
      { title: 'First', icon: 'settings' }, //Icon names: https://material.io/resources/icons/
      { title: 'Second', icon: 'img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg' }
    ],
    buttons: {  //Ovverrides default buttons
      next: { text: 'next step' },
      back: { text: 'go back', color: 'yellow', textColor: 'black' },
      submit: { text: 'send' },
      reset: false,
      clear: false
    },
    tabNavigation: true,  //User can click on tabs
    validateTabNavigation: true,
    validateButtonNavigation: false,
  },

  title: 'Form title',

  localization: 'en-us' // Default 'ru'. See https://github.com/quasarframework/quasar/blob/dev/ui/lang/uk.js
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}