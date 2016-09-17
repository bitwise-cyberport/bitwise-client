import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Grid, Row } from 'react-inline-grid'

export default class ReceiveForm extends Component {

    state = {
        val: {}
    }

    handleIdChange = (e) => {
        this.setState({
            errorId: ""
        })
        const val = e.target.value
        if (val === "") {
            this.setState({
                errorId: "Please enter an id"
            })
        } else {
            this.setState({
                val: Object.assign(this.state.val, { receiverId: val })
            })
        }
    }

    handlePasswordChange = (e) => {
        this.setState({
            errorPassword: ""
        })
        const val = e.target.value
        console.log(val)
        if (val === "") {
            this.setState({
                errorPassword: "Please enter a password"
            })
        } else {
            this.setState({
                val: Object.assign(this.state.val, { receiverPassword: val })
            })
        }
    }

    render() {
        console.log(this.props.userId)
        return (
            <div>
                {
                    Object.keys(this.props.transaction).length === 0 ?
                        <Grid>
                            <div>
                                <Row is="center">
                                    <TextField
                                        hintText="Enter your ID"
                                        onChange={this.handleIdChange}
                                    />
                                </Row>
                                <Row is="center">
                                    <TextField hintText="Enter your password"
                                               onChange={this.handlePasswordChange}/>
                                </Row>
                                <Row is="center">
                                    <FlatButton
                                        label="Verify"
                                        primary={true}
                                        onClick={() => {
                                            console.log(this.state.val.receiverId, this.state.val.receiverPassword)
                                            this.props.verifyTransaction(this.state.val.receiverId, this.state.val.receiverPassword)
                                        }}
                                    />
                                </Row>
                            </div>
                        </Grid>:
                        <Grid>
                            <div>
                                <Row is="center">
                                    <h1>Transaction amount is: {this.props.transaction.amount} HKD</h1>
                                </Row>
                                <Row is="center">
                                    <FlatButton primary={true} label="Continue" onClick={() => {
                                        this.props.confirmTransaction(this.props.userId, this.props.transaction._id)
                                    }}/>
                                </Row>
                            </div>
                        </Grid>
                }
            </div>
        )
    }
}