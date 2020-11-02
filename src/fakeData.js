const db_data_group_options = [
  { name: 'Alpha', id: '114aZ' },
  { name: 'Beta', id: '2aaaZ' },
  { name: 'Gamma', id: '31414aZ' }
];


export const config = {
  data: {
    fields: [
      //1
      {
        type: 'select', rowIndex: 1, key: 'sel1base', // required properties
        label: '@(Группа)',
        options: db_data_group_options,
        value: '2aaaZ',
        async onInput(vNode, value, vNodeStore) {

          //Request
          const { status, data, options } = await WS.send('transactions2', 'usersDataSenders', value)
          if (status === 'OK') {
            const vTarget = vNodeStore.getComponent('sendersKey132')
            vTarget.onInput(data)
            vTarget.setOptions(options)
          }
        }
      },
      //2
      {
        type: 'select', rowIndex: 2, key: 'sendersKey132', // required
        label: '@(Отправитель)',
        options: [],
        rules: [val => val || 'Please select option']
      },

      {
        type: 'email', rowIndex: 3, key: 'accountsKey42222', // required
        label: 'Mail',
        isRequired: false, //simple inputs only
      },

      {
        type: 'text', rowIndex: 3, key: '2421as',
        label: 'Test',
        rules: [val => val.length <= 3 || "Please use maximum 3 characters"]  //array of functions of rules
      },

      // Universal event handlers
      {
        type: 'text', rowIndex: 4, key: '24assa21as',
        label: 'Event Handlers',

        async onBlur(vNode, event, vNodeStore) {
          console.log('blur happend')
          let res = 'this was blurred'

          // optional
          return function (vNode) {
            console.log('callback function')
            vNode.onInput(res)
          }
        },

        async onInput(vNode, value, vNodeStore) {
          console.log('input happend')
          return function (vNode) {
            console.log('callback function')
          }
        },

        async onFocus(vNode, value, vNodeStore) {
          console.log('focus happend')
          return function (vNode) {
            console.log('callback function')
          }
        }
      }
    ],


    buttons: [  // buttons NOT required
      {
        type: 'submit', // required IF buttons declared
        label: 'отправить', color: 'primary', class: 'customClassName' //not required
      },
      { type: 'reset', label: 'сбросить' }  // reset button not required
    ],

    form: {
      isModal: false,
      async onSubmit(vNode, data) {
        console.log('submited', vNode)
        console.log('submited', data)
        // vNode.onReset()
        return function (vNode) {
          console.log('callback function')
        }
      },
      async onReset(vNode, data) {
        console.log('reseted form', vNode)
        const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now

        function cb(vNode) {
          console.log('callback function')
        }
        return { exeptionKey, cb }
      },
      async onValidate(vNode, data) {
        console.log('validated form')        
        // return function (vNode) {
        //   console.log('callback function')
        // }
      },
      async onError(vNode, data, errorComponent) {
        console.log('validation error', errorComponent)
        // return function (vNode) {
        //   console.log('callback function')
        // }
      }
    },

    title: 'Form title'
  },
  label: "working"
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}