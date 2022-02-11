import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { FieldInputProps, FormikProps } from 'formik'

import FileReader from '@/utils/file-reader'
import { Colors } from '@/theme'
import Thumbnail from './thumbnail'
import Button from './button'
import Clickable from './clickable'

const StyledDiv = styled.div`
  width: fit-content;
  
  .remove-button {
    position: absolute;
    right: -10px;
    top: 11px;
    border: 1px solid ${Colors.PRIMARY};
    border-radius: 10px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
  
    img {
      width: 10px;
      height: 10px
    }
  }
  
  .file-content-box {
    position: relative;
  }

  .file-input {
    display: none;
  }
`

interface IFileInput {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (value: string) => void
  type: 'image' | 'file'
  value: any
  accept?: string
  className?: string
}

class FileInput extends Component<IFileInput, { imageUrl: any | null, file: any | null }> {
  state = {
    imageUrl: null,
    file: null
  }

  _input?: any

  _onChange = async (e: any) => {
    const { field, form, onChange, type } = this.props
    const file = e.target.files[0]

    if (!file) return

    if (onChange) onChange(e)

    if (type === 'image') {
      const imageUrl = await FileReader.getBase64(file)

      this.setState({
        imageUrl,
        file
      })

      if (field && form) {
        form.setFieldValue(field.name, {
          file,
          imageUrl
        })
      }
    }

    if (type === 'file') {
      this.setState({
        file
      })

      if (field && form) {
        form.setFieldValue(field.name, {
          file
        })
      }
    }
  }

  _onClick = (e: any) => {
    e.preventDefault()
    this._input.click()
  }

  clear = (e: any) => {
    this._onRemoveClick(e)
  }

  _onRemoveClick = (e: any) => {
    e.stopPropagation()

    const { field, form, type } = this.props

    this._input.value = null

    if (type === 'file') {
      if (field && form) {
        form.setFieldValue(field.name, null)
      }
    }
  }

  render() {
    const { field, form, value, className, type, ...props } = this.props
    const { imageUrl, file }: any = this.state

    return (
      <StyledDiv
        {...(field && { id: `formik-field-${field.name}` })}
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className, 'file-input')}
      >
        {type === 'image' && (
          <Clickable
            onClick={this._onClick}
          >
            <Thumbnail
              url={imageUrl || field?.value || value}
              size={180}
            />
          </Clickable>
        )}
        {type === 'file' && (
          <Button
            onClick={this._onClick}
          >
            {file?.name || field?.value || value || 'Select a file'}
          </Button>
        )}
        <input
          {...props}
          ref={(ref) => { this._input = ref }}
          type="file"
          className="file-input"
          onChange={this._onChange}
        />
      </StyledDiv>
    )
  }
}

export default FileInput
