const { decorateCreateStore, decorateCombineReducers } = require('../lib')
const redux = require('redux')

function carsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_CAR':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

function booksReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_BOOK':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

const createStore = decorateCreateStore(redux.createStore)
const combineReducers = decorateCombineReducers(redux.combineReducers)

const store = createStore(combineReducers({
  cars: carsReducer
}))

store.subscribe(() => {
  console.log('state', store.getState())
})

store.dispatch({
  type: 'ADD_CAR',
  payload: 'ferrari'
})

store.addReducer('books', booksReducer)

store.dispatch({
  type: 'ADD_BOOK',
  payload: 'moby dick'
})

store.removeReducer('books')

store.dispatch({
  type: 'ADD_BOOK',
  payload: 'moby dick'
})
