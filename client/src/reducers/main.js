import * as transConstants from "../constants/transConstants"
import {Map, OrderedMap} from "immutable"

const initialState = Map({
    transactions: OrderedMap({}),
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
        default:
            return initialState
    }
}