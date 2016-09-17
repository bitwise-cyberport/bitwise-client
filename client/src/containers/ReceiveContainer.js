import { connect } from 'react-redux'
import ReceiveForm from '../components/ReceiveForm'
import { verifyTransaction, confirmTransaction, setPendingTransaction } from '../actions/transactions'

const mapStateToProps = (state) => {
    return {
        userId: state.main.get("userId"),
        transaction: state.main.get("transaction")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyTransaction: (id, pass) => {
            dispatch(verifyTransaction(id, pass))
        },
        confirmTransaction: (userId, transactionId) => {
            dispatch(confirmTransaction(userId, transactionId))
        },
        setPendingTransaction: (transaction) => {
            dispatch(setPendingTransaction(transaction))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReceiveForm)