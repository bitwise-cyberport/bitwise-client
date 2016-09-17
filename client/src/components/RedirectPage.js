import React, { Component } from 'react'
import ls from 'local-storage'
import {createFetch, json, parseJSON, base, method, header} from 'http-client'
import { SERVER_URL, PAYPAL_BASE_URL, PAYPAL_TOKEN } from '../constants/config'
import { connect } from 'react-redux'

class RedirectPage extends Component {

    componentDidMount() {
        const receiverId = ls("receiverId")
        const receiverPassword = ls("receiverPassword")
        const amount = ls("amount")
        const paymentId = this.props.location.query.paymentId
        const PayerID = this.props.location.query.PayerID
        ls.clear()
        const postTransaction = createFetch(
            base(SERVER_URL),
            method("POST"),
            json({
                receiverId,
                receiverPassword,
                userId: this.props.userId,
                paymentId,
                amount
            }),
            parseJSON()
        )
        postTransaction("/api/transaction").then(resp => {
            console.log(resp.jsonData)
        })
        const executePayment = createFetch(
            base(PAYPAL_BASE_URL),
            method("POST"),
            header("Authorization", "Bearer " + PAYPAL_TOKEN),
            json({
                payer_id: PayerID
            }),
            parseJSON()
        )
        executePayment("/v1/payments/payment/" + paymentId + "/execute").then(resp => {
            console.log(resp.jsonData)
        })
    }

    render() {
        return (
            <h1>Transaction has been processed</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.main.userId
    }
}

export default connect(mapStateToProps)(RedirectPage)