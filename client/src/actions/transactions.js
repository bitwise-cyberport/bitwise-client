import * as transConstants from "../constants/transConstants"
import axios from "axios"

export function createTransaction() {

}

export function fetchTransactions(userId) {
    return async function(dispatch) {
        try {
            let transactions = await axios.get("/transaction", {
                params: {
                    userId
                }
            })
            return dispatch(setTransactions(transactions))
        } catch (err) {
            console.log(err)
        }
    }
}

export function setTransactions(transactions) {
    return {
        type: transConstants.SET_TRANSACTIONS,
        transactions
    }
}