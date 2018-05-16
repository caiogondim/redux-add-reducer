# redux-mutable-reducer

<div>
<img src="http://travis-ci.org/caiogondim/redux-mutable-reducer.js.svg?branch=master" alt="Travis CI">
</div>

<br>

Add and remove reducers to a redux store after instantiation.

## Installation

```bash
npm i -S redux-mutable-reducer
```

## Usage

```js
const { decorateCreateStore, decorateCombineReducers } = require('redux-mutable-reducer')

const createStore = decorateCreateStore(redux.createStore)
const combineReducers = decorateCombineReducers(redux.combineReducers)

const store = createStore(combineReducers({
  cars: carsReducer
}))

store.addReducer('books', booksReducer)

store.removeReducer('books')
```

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
