import { createStore } from './use-store'

const userState = (set, get) => ({
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
    })
})

const options = {
  name: 'user',
  version: 3
}

const localstorage = true

export default createStore({ config: userState, options, localstorage })
