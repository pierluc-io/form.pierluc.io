import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import logo from '../logo.svg'

import './Header.css'

import HeaderLink from '../HeaderLink'

class Header extends Component {
  render () {
    const { user } = this.props

    return (
      <div className='Header'>
        <HeaderLink to='/'>
          <img src={logo} className='HeaderLogo' alt='logo' />
        </HeaderLink>
        <div className='HeaderTitle Title'>Form</div>
        <ul className='HeaderMenu'>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/browse'>
              <FormattedMessage id='Browse' defaultMessage='Browse' />
            </HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/create'>
              <FormattedMessage id='Create' defaultMessage='Create' />
            </HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            { user
              ? <HeaderLink to='/me'>
                <FormattedMessage id='My Form' defaultMessage='My Form' />
              </HeaderLink>
              : <HeaderLink to='/connect'>
                <FormattedMessage id='Connect' defaultMessage='Connect' />
              </HeaderLink> }
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
