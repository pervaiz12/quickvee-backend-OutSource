import React from 'react'
import { Button } from '@mui/material'

export default function QSubmitButton(props) {
  return (
   
    <Button variant="contained" className='customer-btn' 
            onClick={props.handleSubmitForm} 
     >
            {props.name}
     </Button>
  )
}
