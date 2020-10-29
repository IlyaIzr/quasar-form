export const config = {
  data: {
    fields: [
      {
        type: 'text', value: 'a', label: 'Working label', rowIndex: 1,
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
    ],
    title: 'Form title'
  },
  label: "working",
  onChange: () => {
    const func = async (vueRootCompnent) => { 
      //pseudo code!
      const changedComponent = vueRootCompnent.child
      const response = await ws.send()
      const componentToChange = vueRootCompnent.store.getcomponentbykey()
      componentToChange.value = response.value
    }
    return func
  }
}

export const values = {
  n55eds: '200',
  mailo12: 'testo@validate'
}