import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewAdmin(props) {
  return (
    <>
      <Modal 
        show={props.showAdmin} 
        onHide={props.handleCloseAdminModel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                Array.isArray(props.showMerchantData) ? 
                props.showMerchantData.map((result,index)=>{
                    return(
                        <p key={index}>{result.name}</p>
                    )
                })
                :<p>{props.showMerchantData}</p>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
          onClick={props.handleCloseAdminModel}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewAdmin;