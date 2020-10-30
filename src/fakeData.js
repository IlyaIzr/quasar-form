const db_data_group_options = [
  { name: 'Alpha', id: '114aZ' },
  { name: 'Beta', id: '2aaaZ' },
  { name: 'Gamma', id: '31414aZ' }
];


const db_data_accounts_options = [
  { name: 'Piotr', id: '1414S' },
  { name: 'Ivan', id: '14414S' },
  { name: 'Alex', id: '14414swS' },
];
export const config = {
  data: {
    fields: [
      // {
      //   type: 'text', value: '', label: 'Working label', rowIndex: 2,  // TODO bug if this is empty
      //   key: 'afUID2',
      //   // fetch: { path: '', func: 'fun', payload: 'self' },
      //   onFocus: () => { console.log('first field has focus on') },
      //   onChange: () => {
      //     const updater = async (vnode, vNodeStore) => {
      //       const { value, rest } = vnode
      //       // request
      //       let phrase = 'bad bad'
      //       setTimeout(async () => {
      //         phrase = 'fuck@yea.h'
      //         console.log('runing async function')
      //         const vTarget = vNodeStore.getComponent('mailo12') // field key
      //         console.log(vTarget)
      //         vTarget.onInput(phrase)

      //       }, 2000);
      //     }
      //     return updater
      //   }
      // },
      {
        type: 'select', rowIndex: 1, key: 'sel1base', // required
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

            //Request
            // await WS.connectionEstablished()
            // const { status, data } = await WS.send('transactions2', 'usersDataRecipients', value)
            // if (status === 'OK') {
            //   // console.log(data)
            //   // const vTarget = vNodeStore.getComponent('accountsKey132')
            //   // vTarget.onInput(data)
            // }
          }
          return updater
        }
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