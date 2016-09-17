import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import SendIcon from 'material-ui/svg-icons/content/send'
import { setUserId } from '../actions/misc'
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility'
import MenuItem from 'material-ui/MenuItem'
import { white } from 'material-ui/styles/colors'
import { connect } from 'react-redux'

class Header extends Component {

    state = {
        valueSingle: 1
    }

    static contextTypes = {
        router: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired
        }).isRequired
    }

    handleChangeSingle = (event, value) => {
        this.props.setUserId(value)
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
                iconElementRight={
                    <IconMenu
                        iconButtonElement={<IconButton><AccessibilityIcon /></IconButton>}
                        onChange={this.handleChangeSingle}
                        value={this.state.valueSingle}
                    >
                        <MenuItem value="1" primaryText="Sender"/>
                        <MenuItem value="2" primaryText="Receiver"/>
                    </IconMenu>
                }
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserId: id => {
            dispatch(setUserId(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(Header)