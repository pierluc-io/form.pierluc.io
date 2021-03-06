import React, {Component} from 'react'

import './BrowseForm.css'

class BrowseForm extends Component {
  render () {
    const { base, params, user } = this.props

    return (
      <div className='BrowseForm'>
        {this.props.children && React.cloneElement(this.props.children, { base, params, user })}
      </div>
    )
  }
}

export default BrowseForm
