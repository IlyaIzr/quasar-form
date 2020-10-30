const db_data_group_options = [
  { name: 'Alpha', id: '114aZ' },
  { name: 'Beta', id: '2aaaZ' },
  { name: 'Gamma', id: '31414aZ' }
];


export const config = {
  data: {
    fields: [
      {
        type: 'select', rowIndex: 1, key: 'sel1base', // required properties
        label: '@(Группа)',
        options: db_data_group_options,
        value: { name: 'Beta', id: '2aaaZ' },
        onChange: () => {
          const updater = async (vNode, vNodeStore) => {
            const { value, rest, options } = vNode

            //Request
            await WS.connectionEstablished()
            const { status, data } = await WS.send('transactions2', 'usersDataSenders', value)
            if (status === 'OK') {
              const vTarget = vNodeStore.getComponent('sendersKey132')
              vTarget.onInput(data)
              vTarget.setOptions(options)
            }
          }
          return updater
        }
      },
      {
        type: 'select', rowIndex: 2, key: 'sendersKey132', // required
        label: '@(Отправитель)',
        options: [],
        onChange: () => {
          const updater = async (vNode, vNodeStore) => {
            const { value, rest } = vNode

            // Request
            await WS.connectionEstablished()
            const { status, data, options } = await WS.send('transactions2', 'accountsDataSender', value)
            if (status === 'OK') {
              const vTarget = vNodeStore.getComponent('accountsKey132')
              vTarget.onInput(data)
              vTarget.setOptions(options)
            }
          }
          return updater
        }
      },
      {
        type: 'select', rowIndex: 2, key: 'accountsKey132', // required
        label: '@(Счёт отправителя)',
        options: []
      }
    ],


    buttons: [
      { type: 'submit', text: 'отправить' }
    ],

    form: [
      //form methods like onSubmit
    ],

    title: 'Form title'
  },
  label: "working"
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}