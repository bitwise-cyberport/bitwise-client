import * as transConstants from "../constants/transConstants"
import { API_URL } from '../constants/config'
import {createFetch, json, parseJSON, method, base} from 'http-client'
import { setMessage } from './misc'
import { batchActions } from 'redux-batched-actions'

export function verifyTransaction(receiverId, receiverPassword) {
    return async function(dispatch) {
        try {
            const verifyReq = createFetch(
                base(API_URL),
                method("POST"),
                json({
                    receiverId,
                    receiverPassword
                }),
                parseJSON()
            )
            const resp = await verifyReq("/api/transaction/verify")
            if (resp.jsonData.success) {
                return dispatch(setPendingTransaction(resp.jsonData.data))
            } else {
                return dispatch(setMessage(true, "Failed to verify transaction"))
            }
        } catch (err) {
            console.log(err)
            return dispatch(setMessage(true, "Failed to verify transaction"))
        }
    }

}

export function confirmTransaction(userId, transactionId) {
    return async function(dispatch) {
        try {
            const confirmReq = createFetch(
                base(API_URL),
                method("POST"),
                json({
                    userId,
                    transactionId
                }),
                parseJSON()
            )
            const resp = await confirmReq("/api/transaction/confirm")
            console.log(resp.jsonData)
            if (resp.jsonData.success) {
                return dispatch(batchActions([
                    setPendingTransaction({}),
                    setMessage(false, "Transaction confirmed")
                ]))
            } else {
                return dispatch(setMessage(true, "Failed to confirm transaction"))
            }
        } catch (err) {
            console.log("confirm transaction err: " + err)
            return dispatch(setMessage(true, "Failed to confirm transaction"))
        }
    }
}

export function fetchTransactions(userId) {
    return async function(dispatch) {
        try {
            const fetchTrans = createFetch(
                base(API_URL),
                method("GET"),
                parseJSON()
            )
            const resp = await fetchTrans("/api/transaction/"+userId)
            return dispatch(setTransactions(resp.jsonData.data))
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

export function setPendingTransaction(transaction) {
    return {
        type: transConstants.RECORD_PENDING_TRANSACTION,
        transaction
    }
}