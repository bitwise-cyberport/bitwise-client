/* eslint-disable */
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import reactCSS from 'reactcss'
import {PAYPAL_TOKEN} from '../constants/config'
import {createFetch, base, header, method, json} from 'http-client'

export default class SendForm extends Component {



    state = {
        val: {}
    }

    makeTransaction = () => {
        const fetch = createFetch(
            base("https://api.sandbox.paypal.com"),
            method("POST"),
            header("Authorization", "Bearer " + PAYPAL_TOKEN),
            json({
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    return_url: 'http://return_URL_here',
                    cancel_url: 'http://return_URL_here'
                },
                transactions: [
                    {
                        amount: {
                            total: this.state.val.amount.toString(),
                            currency: "HKD"
                        }
                    }
                ]
            })
        )
        fetch("/v1/payments/payment").then(resp => {
            const data = resp.body
            if (data.status == "created") {

            }
        }, err => {
            console.log(err)
        })
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
        const styles = reactCSS({
            default: {
                container: {
                    marginLeft: "5em",
                    marginRight: "5em",
                },
                center: {
                    margin: 0
                }
            }
        })
        return (
            <div style={styles.container}>
                <TextField
                    hintText="Receiver ID"
                    onChange={this.handleIdChange}
                    errorText={this.state.errorId}
                /><br />
                <TextField
                    hintText="Receiver Password"
                    onChange={this.handlePasswordChange}
                    errorText={this.state.errorPassword}
                /><br />
                <TextField
                    hintText="Amount (HKD)"
                    onChange={this.handleAmountChange}
                    errorText={this.state.errorAmount}
                /><br/>
                <FlatButton label="Submit" primary={true}
                    disabled={
                        !(this.state.errorPassword === "") && !(this.state.errorAmount === "") &&
                        !(this.state.errorId === "")
                    }
                    onClick={this.makeTransaction}/>
            </div>
        )
    }
}