import React, { Component} from 'react'
import { connect } from 'react-redux'
import SendForm from '../components/SendForm'

class SendContainer extends Component {
    render() {
        return (
            <SendForm/>
        )
    }
}

// const mapStateToProps = (state) => {
//
// }
//
// const mapDispatchToProps = (dispatch) => {
//
// }
//
export default connect()(SendContainer)