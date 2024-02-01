import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewMerchant(props) {
  return (
    <>
      <Modal 
        show={props.showMerchant} 
        onHide={props.handleCloseMerchantModel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                Array.isArray(props.showMerchantData) ? props.showMerchantData.map((result,index)=>{
                    return(
                        <div key={index}>
                            <p>{result.name}</p>
                            <p>{result.name}</p>
                        </div>
                    )
                })
                :<p>no record found</p>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
          onClick={props.handleCloseMerchantModel}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewMerchant;