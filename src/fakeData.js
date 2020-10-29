export const gSettings = {
  data: {
    fields: [
      {
        type: 'text', value: '', label: 'Working text', rowIndex: 1,
        key: 'afUID2',
        // fetch: { path: '', func: 'fun', payload: 'self' },
        onFocus: () => { console.log('Function passed') },
      },
      {
        type: 'number', value: '14', label: 'Working number', rowIndex: 1,
        key: 'n55eds',
      },
      {
        type: 'email', value: '', label: 'Your working email', rowIndex: 2,
        key: 'mailo12', renderIf: 'afUID2',
        onFocus: () => {
          const methodCaller = (vueComponent) => {
            vueComponent.extraMethod()
          }
          return methodCaller
        }
      },
    ],
    buttons: [
      { type: 'submit', text: 'отправить' }
    ]
  },
  label: "working"
}

// try to separate settings and config
// data = {
//   value: {
//     key: 'afasfa'
//   }
// }