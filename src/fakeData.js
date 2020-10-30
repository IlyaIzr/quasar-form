export const config = {
  data: {
    fields: [
      {
        type: 'text', value: '', label: 'Working label', rowIndex: 1,  // TODO bug if this is empty
        key: 'afUID2',
        // fetch: { path: '', func: 'fun', payload: 'self' },
        onFocus: () => { console.log('Function passed') },
        onChange: () => {
          const updater = async (vnode, vNodeStore) => {
            const { value, rest } = vnode
            // request
            let phrase = 'bad bad'
            setTimeout(async () => {
              phrase = 'fuck yeah'
              console.log('runing async function')
              const vTarget = vNodeStore.getComponent('mailo12') // field key
              console.log(vTarget)
              vTarget.onInput(phrase)

            }, 2000);
          }
          return updater
        }
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