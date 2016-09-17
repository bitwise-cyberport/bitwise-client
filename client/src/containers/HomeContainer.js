import React, { Component } from 'react'
import { fetchTransactions } from '../actions/transactions'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-inline-grid'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class HomeContainer extends Component {

    componentWillMount() {
        this.props.fetchTransactions(this.props.userId)
    }

    render() {
        // const { Table, Th, TableHeader, Tr, Td} = Reactable
        return (
            <Grid>
                <Row is="center">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Timestamp</TableHeaderColumn>
                                <TableHeaderColumn>Receiver</TableHeaderColumn>
                                <TableHeaderColumn>Amount (HKD)</TableHeaderColumn>
                                <TableHeaderColumn>Completed</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                this.props.transactions.map(transaction => {
                                    transaction = transaction[1]
                                    return (
                                        <TableRow key={transaction._id}>
                                            <TableRowColumn key={1}>{transaction.timestamp}</TableRowColumn>
                                            <TableRowColumn key={2}>{transaction.receiverId}</TableRowColumn>
                                            <TableRowColumn key={3}>{transaction.amount}</TableRowColumn>
                                            <TableRowColumn key={4} style={transaction.success ? {color: "green"} :
                                            {color: "red"}
                                            }>
                                                {transaction.success.toString()}
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
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