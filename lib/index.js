const redux = require('redux')

function decorateCreateStore(createStore) {
  return (reducer, ...args) => {
    if (!reducer._reducers) {
      throw new TypeError('Expected reducer to be created with decorated `combineReducers`')
    }

    const store = createStore(reducer, ...args)
    const reducers = reducer._reducers

    store.addReducer = (name, newReducer) => {
      reducers[name] = newReducer
      store.replaceReducer(redux.combineReducers(reducers))
    }

    store.removeReducer = (name) => {
      reducers[name] = undefined
      store.replaceReducer(redux.combineReducers(reducers))
    }

    return store
  }
}

function decorateCombineReducers(combineReducers) {
  return (reducers) => {
    const combinedReducers = combineReducers(reducers)
    combinedReducers._reducers = reducers
    return combinedReducers
  }
}

module.exports = {
  decorateCreateStore,
  decorateCombineReducers
}
