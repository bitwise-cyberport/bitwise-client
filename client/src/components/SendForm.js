import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import reactCSS from 'reactcss'

export default class SendForm extends Component {

    state = {
        val: {}
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
                    hintText="Amount"
                    onChange={this.handleAmountChange}
                    errorText={this.state.errorAmount}
                /><br/>
                <FlatButton label="Submit" primary={true}
                    disabled={
                        !(this.state.errorPassword === "") && !(this.state.errorAmount === "") &&
                        !(this.state.errorId === "")
                    }
                    onClick={() => {
                        console.log(this.state.val)
                }}/>
            </div>
        )
    }
}