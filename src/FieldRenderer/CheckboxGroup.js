import React, {Component, PropTypes} from 'react'

import './CheckboxGroup.css'

import Label from '../Label'
import Text from '../Text'

class CheckboxGroup extends Component {
  render () {
    const { input, onChange } = this.props

    return (
      <div className='CheckboxGroup'>
        <div className='Label'>{input.label}</div>
        {input.description && <Text classnames='CheckboxGroupDescription' content={input.description} />}
        {input.choices.map((choice, index) => (
          <Label key={index}>
            <input type='checkbox' value={choice.value} onChange={onChange} checked={(input.values || []).indexOf(choice.value) >= 0} />
            <span>{choice.label}</span>
          </Label>
        ))}
        {input.help && <Text classnames='CheckboxGroupHelp' content={input.help} />}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CheckboxGroup
