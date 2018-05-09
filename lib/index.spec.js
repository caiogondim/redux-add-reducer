/* eslint-env jest */

const redux = require('redux')
const { decorateCreateStore, decorateCombineReducers } = require('../lib')

//
// Helpers
//

function carsReducer (state = [], action = {}) {
  switch (action.type) {
    case 'ADD_CAR':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

function booksReducer (state = [], action = {}) {
  switch (action.type) {
    case 'ADD_BOOK':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

//
// Tests
//

it('works as a regular redux store', () => {
  const createStore = decorateCreateStore(redux.createStore)
  const combineReducers = decorateCombineReducers(redux.combineReducers)

  const store = createStore(combineReducers({
    cars: carsReducer
  }))

  store.dispatch({
    type: 'ADD_CAR',
    payload: 'ferrari'
  })

  expect(store.getState()).toEqual({cars: [ 'ferrari' ]})
})

it('allows reducer to be added after store instantiation', () => {
  const createStore = decorateCreateStore(redux.createStore)
  const combineReducers = decorateCombineReducers(redux.combineReducers)

  const store = createStore(combineReducers({
    cars: carsReducer
  }))

  store.dispatch({
    type: 'ADD_CAR',
    payload: 'ferrari'
  })
  expect(store.getState()).toEqual({cars: [ 'ferrari' ]})

  store.addReducer('books', booksReducer)
  store.dispatch({
    type: 'ADD_BOOK',
    payload: 'moby dick'
  })
  expect(store.getState()).toEqual({cars: [ 'ferrari' ], books: ['moby dick']})
})

it('allows reducer to be removed after store instantiation', () => {
  const createStore = decorateCreateStore(redux.createStore)
  const combineReducers = decorateCombineReducers(redux.combineReducers)

  const store = createStore(combineReducers({
    cars: carsReducer,
    books: booksReducer
  }))

  store.dispatch({
    type: 'ADD_CAR',
    payload: 'ferrari'
  })
  store.dispatch({
    type: 'ADD_BOOK',
    payload: 'moby dick'
  })
  expect(store.getState()).toEqual({cars: [ 'ferrari' ], books: ['moby dick']})

  store.removeReducer('cars')
  store.dispatch({
    type: 'ADD_CAR',
    payload: 'porsche'
  })
  expect(store.getState()).toEqual({cars: [ 'ferrari' ], books: ['moby dick']})
})
