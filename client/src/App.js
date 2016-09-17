import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './components/Header'
import Message from './components/Message'

class App extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  render() {
    return (
        <div>
          <Header/>
          {this.props.children}
          <Message/>
        </div>
    );
  }
}

export default App;
