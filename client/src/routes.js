import React from 'react'
import { IndexRoute, Route } from 'react-router';
import App from './App'
import HomeContainer from './containers/HomeContainer'
import SendContainer from './containers/SendContainer'

export default function getRoutes(store) {

    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomeContainer}/>
            <Route path="/send" component={SendContainer} />
        </Route>
    )
}