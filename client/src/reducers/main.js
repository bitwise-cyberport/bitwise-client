import * as transConstants from "../constants/transConstants"
import * as miscConstants from '../constants/miscConstants'
import {Map, OrderedMap} from "immutable"

const initialState = Map({
    transactions: OrderedMap({}),
    transaction: {},
    message: {},
    userId: 1
})

export default function transactions(state = initialState, action) {
    state = state.set("message", {})
    switch (action.type) {
        case transConstants.CREATE_TRANSACTION:
            return state.setIn(["transactions", state.transaction.id], {
                ...state.transaction
            })
        case transConstants.SET_TRANSACTIONS:
            let transactions = action.transactions.map(transaction => {
                return [transaction.id, transaction]
            })
            return state.set("transactions", transactions)
        case transConstants.RECORD_PENDING_TRANSACTION:
            return state.set("transaction", action.transaction)
        case miscConstants.SET_USER_ID:
            return state.set("userId", action.userId)
        case miscConstants.SET_MESSAGE:
            console.log(action.message)
            return state.set("message", action.message)
        default:
            return initialState
    }
}