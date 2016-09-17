import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-inline-grid'

class Message extends Component {

    render() {
        return (
            <Grid>
                <Row is="center">
                    <h1 style={this.props.message.isError ? {color: "red"} : { color: "green"}}>
                        {this.props.message.text}
                    </h1>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.main.get("message")
    }
}

export default connect(mapStateToProps)(Message)