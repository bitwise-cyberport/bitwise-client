import * as transConstants from "../constants/transConstants"
import * as userConstants from '../constants/userConstants'
import {Map, OrderedMap} from "immutable"

const initialState = Map({
    transactions: OrderedMap({}),
    transaction: {},
    userId: 1
})

export default function transactions(state = initialState, action) {
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
        case userConstants.SET_USER_ID:
            return state.set("userId", action.userId)
        default:
            return initialState
    }
}