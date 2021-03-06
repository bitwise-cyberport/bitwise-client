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
        console.log(value)
        this.props.setUserId(parseInt(value, 10))
    }

    render() {
        return (
            <AppBar
                title={<span style={{cursor: "pointer"}}>NAB</span>}
                iconElementLeft={
                    <IconButton onClick={this.props.userId === 1 ?
                        () => {
                            console.log(this.props.userId)
                            this.context.router.push("/send")
                        } :
                        () => {
                            this.context.router.push("/receive")
                        }
                    }>
                        <SendIcon color={white}/>
                    </IconButton>
                }
                onTitleTouchTap={() => {
                    this.context.router.push("/")
                }}
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

const mapStateToProps = (state) => {
    console.log(state.main.get("userId"))
    return {
        userId: state.main.get("userId")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserId: id => {
            dispatch(setUserId(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)