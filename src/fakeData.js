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
        async onChange(vNode, vNodeStore) {
          const { value, rest } = vNode

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
      //3
      {
        type: 'select', rowIndex: 2, key: 'accountsKey132', // required
        label: '@(Счёт отправителя)',
        options: []
      },

      {
        type: 'email', rowIndex: 3, key: 'accountsKey42222', // required
        label: 'Mail',
        isRequired: false //simple inputs only
      },

      {
        type: 'text', rowIndex: 3, key: '2421as', // required
        label: 'Test',
        rules: [val => val.length <= 3 || "Please use maximum 3 characters"]  //array of functions of rules
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
      },
      async onReset(vNode, data) {
        console.log('reseted form', vNode)
        const exeptionKey = 'sel1base' // don't reset firld with that key. 1 key only for now
        return exeptionKey
      },
      async onValidate(vNode, data) {
        console.log('validated form')
      },
      async onError(vNode, data, errorComponent) {
        console.log('validation error', errorComponent)
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