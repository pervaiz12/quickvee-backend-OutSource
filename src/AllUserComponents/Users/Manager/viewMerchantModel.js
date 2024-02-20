import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewMerchant(props) {
  return (
    <>
      {/* <Modal 
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
      </Modal> */}
     
      <hr/>
      {
        props.showMerchant ?
          <div className="q-custom-modal-container" id="addtributes_">
          {/* Your modal JSX */}
          <div className="q-custom-modal-content">
            {/* Your modal content */}
            <div className="">
              <p className="q-custom-modal-header ">
              {props.name}
              
              </p>
            </div>
            {/* ... other modal content ... */}
            {
                Array.isArray(props.showMerchantData) ? props.showMerchantData.map((result,index)=>{
                    return(
                        <div key={index}>
                            <p>{result.name}</p>
                          
                        </div>
                    )
                })
                :<p>no record found</p>
            }
            {/* <input
              type="text"
              placeholder="Enter attribute title"
              className="q-custom-input-field"
              value={newAttribute}
              onChange={changeTittleHandler}
            /> */}
            <span className="input-error">
              {/* {errorMessage !== "" ? errorMessage : ""} */}
            </span>
            <div className="q-add-categories-section-middle-footer">
              {/* <button
                // onClick={handleAddAttribute}
                className="quic-btn quic-btn-save"
              >
                Add
              </button> */}
              <button
                onClick={props.handleCloseMerchantModel}
                className="quic-btn quic-btn-cancle"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
        :''

      }
     
    </>
  );
}

export default ViewMerchant;