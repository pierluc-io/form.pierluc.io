import React, {Component, PropTypes} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import flow from 'lodash.flow'

import FormService from '../FormService'

import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextInput from './TextInput'

import {ItemTypes} from '../Draggable'

const dragSource = {
  beginDrag (props) {
    return {
      input: props.input
    }
  }
}

const dropTarget = {
  drop (props) {
    // TODO: Wire this
    // onOrderChanged()
  }
}

function collectSource (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class DraggableFieldRenderer extends Component {
  getComponent (type) {
    switch (type) {
      case 'email':
      case 'number':
      case 'text':
        return TextInput
      case 'radio':
        return RadioGroup
      case 'select':
        return Select
      case 'checkbox':
        return CheckboxGroup
      default:
        return
    }
  }

  render () {
    const {
      input,
      edit,
      focus,
      onEditClicked,
      onRemoveClicked,
      onChange,
      onKeyPress,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props

    const Component = this.getComponent(input.type)

    const style = parseInt(input.order, 10) >= 0 ? {
      order: input.order
    } : {}

    return Component ? connectDragSource(connectDropTarget(
      <div className='DraggableFieldRenderer' style={style}>
        <Component
          input={input}
          value={FormService.isMultipleChoices(input.type) ? [] : ''}
          edit={edit}
          focus={focus}
          onEditClicked={onEditClicked}
          onRemoveClicked={onRemoveClicked}
          onChange={onChange}
          onKeyPress={onKeyPress}
          isDragging={isDragging} />
      </div>
    )) : null
  }
}

DraggableFieldRenderer.propTypes = {
  input: PropTypes.object.isRequired,
  value: PropTypes.object,
  edit: PropTypes.bool,
  focus: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default flow([
  DragSource(ItemTypes.FIELD, dragSource, collectSource),
  DropTarget(ItemTypes.FIELD, dropTarget, collectTarget)
])(DraggableFieldRenderer)