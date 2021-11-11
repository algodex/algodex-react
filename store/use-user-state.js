import { createStore } from './use-store'
import _ from 'lodash'
const userState = (set, get) => ({
  query: '',
  setQuery: (query) => {
    set({ query })
  },
  search: {
    sortBy: [
      {
        id: 'price',
        desc: true
      }
    ]
  },
  setSearch: (search) =>
    set({
      search: {
        ...get().search,
        ...search
      }
    }),
  accounts: {},
  setAccounts: (accounts) =>
    set({
      accounts: _.merge(get().accounts, accounts)
    })
})

const options = {
  name: 'user',
  version: 3
}

const localstorage = true

export default createStore({ config: userState, options, localstorage })
