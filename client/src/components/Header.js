import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'
import SendIcon from 'material-ui/svg-icons/content/send'
import { white } from 'material-ui/styles/colors'

export default class Header extends Component {

    static contextTypes = {
        router: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired
        }).isRequired
    }
    render() {
        return (
            <AppBar
                title="NAB"
                iconElementLeft={
                    <IconButton onClick={() => {
                        this.context.router.push("/send")
                    }}>
                        <SendIcon color={white}/>
                    </IconButton>
                }
            />
        )
    }
}