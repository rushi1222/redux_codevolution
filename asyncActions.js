const redux  = require('redux')
const thunkMiddlewear = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware



const initialState = {
    loading: false,
    users: [],
    errror: '',
}

const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED' 
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED' 
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED' 

const fetchUsersRequest = ()=>{
    return {
        type: FETCH_USERS_REQUESTED,
    }
    
}

const fetchUsersSuccess = (users)=>{
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
    
}
const fetchUsersFailure = (error)=>{
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
    
}

const reducer = (state = initialState, action)=>{
    switch(action.type)
{
    case FETCH_USERS_REQUESTED:
        return {
            ...state,
            loading: false,
        }
    case FETCH_USERS_SUCCEEDED:
        return {
            ...state,
            loading: true,
            users: action.payload,
            error: ''
        }    
    case FETCH_USERS_REQUESTED:
        return {
            ...state,
            loading: true,
            users: '',
            error: action.payload
        }    
}
}

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
            const users = response.data.map((user)=> user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error)=>{
            dispatch(fetchUsersFailure(error.message))
            //error.message is the error message
        })

    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddlewear))

store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())