import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {PAYPAL_TOKEN, REDIRECT_URL, CANCEL_URL, PAYPAL_BASE_URL} from '../constants/config'
import {createFetch, base, header, method, json, parseJSON} from 'http-client'
import { Grid, Row } from 'react-inline-grid'

export default class SendForm extends Component {

    state = {
        val: {}
    }

    makeTransaction = () => {
        const fetch = createFetch(
            base(PAYPAL_BASE_URL),
            method("POST"),
            header("Authorization", "Bearer " + PAYPAL_TOKEN),
            json({
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    return_url: REDIRECT_URL,
                    cancel_url: CANCEL_URL
                },
                transactions: [
                    {
                        amount: {
                            total: this.state.val.amount.toString(),
                            currency: "HKD"
                        },
                        description: "NAB transaction",
                    }
                ]
            }),
            parseJSON()
        )
        fetch("/v1/payments/payment").then(resp => {
            const data = resp.jsonData
            if (data.state === "created") {
                const redirectTo = data.links.filter(link => {
                    return link.method === "REDIRECT"
                })[0].href
                this.storeAndRedirect(redirectTo)
            }
        }, err => {
            console.log(err)
        })
    }

    storeAndRedirect = function(url) {
        console.log("payment creation succeeded")
        window.name = this.state.val.id + ";" + this.state.val.password + ";" + this.state.val.amount
        console.log(this.state.val.id, this.state.val.password)
        location.href  = url
    }

    handleIdChange = (e) => {
        this.setState({
            errorId: ''
        })
        const val = e.target.value
        if (!val) {
            this.setState({
                errorId: "Please enter a receiver ID"
            })
        } else {
            this.setState({
                val: Object.assign(this.state.val, {id: val})
            })
        }
    }

    handlePasswordChange = (e) => {
        this.setState({
            errorPassword: ''
        })
        const val = e.target.value
        if (val === "") {
            this.setState({
                errorPassword: "Please enter a receiver password"
            })
        } else {
            this.setState({
                val: Object.assign(this.state.val, {password: val})
            })
        }
    }

    handleAmountChange = (e) => {
        this.setState({
            errorAmount: ''
        })
        const val = parseFloat(e.target.value)
        console.log(val)
        if (isNaN(val)) {
            this.setState({
                errorAmount: "Please enter a valid number"
            })
        } else {
            this.setState({
                val: Object.assign(this.state.val, {amount: val})
            })
        }
    }


    render() {
        return (
            <Grid>
                <div>
                    <Row is="center">
                        <TextField
                            hintText="Receiver ID"
                            onChange={this.handleIdChange}
                            errorText={this.state.errorId}
                        />
                    </Row>
                    <Row is="center">
                        <TextField
                            hintText="Receiver Password"
                            onChange={this.handlePasswordChange}
                            errorText={this.state.errorPassword}
                        />
                    </Row>
                   <Row is="center">
                       <TextField
                           hintText="Amount (HKD)"
                           onChange={this.handleAmountChange}
                           errorText={this.state.errorAmount}
                       />
                   </Row>
                    <Row is="center">
                        <FlatButton label="Submit" primary={true}
                            disabled={
                                !(this.state.errorPassword === "") && !(this.state.errorAmount === "") &&
                                !(this.state.errorId === "")
                            }
                            onClick={this.makeTransaction}/>
                    </Row>
                </div>
            </Grid>
        )
    }
}