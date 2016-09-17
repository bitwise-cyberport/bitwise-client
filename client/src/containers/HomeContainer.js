import React, { Component } from 'react'
import Reactable from 'reactable'
import { fetchTransactions } from '../actions/transactions'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-inline-grid'


class HomeContainer extends Component {

    componentWillMount() {
        this.props.fetchTransactions(this.props.userId)
    }

    render() {
        const { Table, Th, Thead, Tr, Td} = Reactable
        return (
            <Grid>
                <Row is="center">
                    <Table>
                        <Thead>
                        <Th column="timestamp">
                            <strong>Timestamp</strong>
                        </Th>
                        <Th column="receiverId">
                            <strong>Receiver</strong>
                        </Th>
                        <Th column="amount">
                            <strong>Amount (HKD)</strong>
                        </Th>
                        <Th column="success">
                            <strong>Completed</strong>
                        </Th>
                        </Thead>
                        {
                            this.props.transactions.map(transaction => {
                                transaction = transaction[1]
                                return (
                                    <Tr key={transaction._id}>
                                        <Td column="timestamp">{transaction.timestamp}</Td>
                                        <Td column="receiverId">{transaction.receiverId}</Td>
                                        <Td column="amount">{transaction.amount}</Td>
                                        <Td column="success">{transaction.success}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Table>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.main.get("transactions"))
    return {
        userId: state.main.get("userId"),
        transactions: state.main.get("transactions")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTransactions: function(userId) {
            dispatch(fetchTransactions(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)