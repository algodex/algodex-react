# @algodex/components

All modules must follow the following standards:


1. Directories/files must match the function they export
    - Good: ./components/Nav/ActiveLink.jsx 
    - Bad: ./components/active-link/index.jsx
2. Prefer Single file component over index.js when possible.
    - Good: ./components/Search.jsx
    - Bad: ./components/search/index.jsx
3. Multiple file components can have an index.js
    - Good: ./components/Orders/index.jsx
      - Import from index.js: import Orders, {OrderInput} from './components/Orders'
      - Export from index.js: export {default as OrderInput} from 'components/Orders/OrderInput'
    - Bad: ./components/orders/index.jsx
    - Bad: ./components/order-input/index.jsx
