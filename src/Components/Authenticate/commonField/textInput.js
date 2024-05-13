import React from 'react'
import { FormControl, Button, TextField } from '@mui/material';

export default function TextInput(props) {
  return (
    <TextField
      className="input-field"
      label={props.label}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      variant="outlined"
      onBlur={props.handleBlur?() =>props.handleBlur(props.name):null}
      // autoComplete={props.autoComplete}
      name={props.name}
      inputProps={{
        autoComplete: 'off'
     }}

/>
  )
}
