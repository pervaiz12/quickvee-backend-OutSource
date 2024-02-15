import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function  Test(props){
  return (
    <>
    
    {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

<Modal show={props.show}  animation={false} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClickSet} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Test