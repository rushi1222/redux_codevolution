const redux  = require('redux')
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'


function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qnt = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qnt,
    }
}

function orderIcecream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1,
    }
}

function restockIcecream(qnt = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qnt,
    }
}


const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numofIceCreams: 10,
}

const cakeReducer = (state = initialCakeState, action)=>{
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes-1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes+ action.payload,
            }        
            default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action)=>{
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams-1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numofIceCreams: state.numofIceCreams+ action.payload,
            }        
            default:
            return state
    }
}


const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})
const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(()=>{})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderIcecream())


unsubscribe()