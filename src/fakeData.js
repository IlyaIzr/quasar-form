export const config = {
  data: {
    fields: [
      {
        type: 'text', value: '', label: 'Working label', rowIndex: 1,  // TODO bug if this is empty
        key: 'afUID2',
        // fetch: { path: '', func: 'fun', payload: 'self' },
        onFocus: () => { console.log('first field has focus on') },
        onChange: () => {
          const updater = async (vnode, vNodeStore) => {
            const { value, rest } = vnode
            // request
            let phrase = 'bad bad'
            setTimeout(async () => {
              phrase = 'fuck@yea.h'
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
        type: 'number', label: 'Working number?', rowIndex: 1,
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
      {
        type: 'select', rowIndex: 3, key: 'sel1base',
        label: 'first select',
        options: [{ name: 'BMW', id: 'car' }, { name: 'Samsung Phone', id: 'phone' }],
        renderIf: 'n55eds',
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