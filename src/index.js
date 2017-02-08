import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

import localeData from '../messages/data.json'

addLocaleData([...en])

import './reset.css'
import './index.css'

import App from './App'
import Browse from './Browse'
import Connect from './Connect'
import Form from './Form'
import FormList from './FormList'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Me from './Me'
import Profile from './Profile'

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en

ReactDOM.render((
  <IntlProvider locale={language} messages={messages}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='browse' component={Browse}>
          <IndexRoute component={FormList} />
          <Route path=':form' component={Form} />
        </Route>
        <Route path='me' component={Me}>
          <IndexRoute component={Profile} />
          <Route path='connect' component={Connect} />
        </Route>
        <Route path='connect' component={Login} />
        <Route path='disconnect' component={Logout} />
      </Route>
    </Router>
  </IntlProvider>
), document.getElementById('root'))
