import * as transConstants from "../constants/transConstants"
import { API_URL } from '../constants/config'
import {createFetch, json, parseJSON, method, base} from 'http-client'
import axios from "axios"

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
            }
        } catch (err) {
            console.log(err)
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
            return dispatch(setPendingTransaction({}))
        } catch (err) {
            console.log("confirm transaction err: " + err)
        }
    }
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

export function setPendingTransaction(transaction) {
    return {
        type: transConstants.RECORD_PENDING_TRANSACTION,
        transaction
    }
}