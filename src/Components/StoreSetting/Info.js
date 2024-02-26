import React,{useEffect} from 'react'
import infoImage from '../../image/Group 196.svg'

import InfoFunction from './infoFunctionality/infoFunction'
import Alert from '@mui/material/Alert';

const Info = () => {
const{handleSubmitInfo,imageBanner,image,handleDelete,handleEditRecord,infoRecord,onChangeHandle,imageBoolean,BannersBoolean,successsMessage,hideSucess,errors}=InfoFunction()
let data={
  id:100
}
useEffect(()=>{
  handleEditRecord(data)

},[])
  return (
    <div className='box'>
        <div className='box_shadow_div'>
        {
               hideSucess ? <Alert severity="success">
                {successsMessage}
               </Alert>:''
            }
          <div className='infoheader'>
            <div className='qvrow'>
              <div className='col-qv-6'>
                <h1>{infoRecord.store}</h1>   
              </div>
              <div className='col-qv-6'>
                <div className='infoheader-left'>
                  <h4 >{infoRecord.email}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='box_shadow_div'>
          <div className='infoheader'>
            <div className='qvrow'>
              <div className='col-qv-12'>
                  <ul className='info-unorder'>
                    <li>Pick an easy to remember name and verify if it's available to be used for your store</li>
                    <li>Please enter your store name in the input field above so that we can create a menu link for your store</li>
                    <li>If you select "abcstore" as the name, the URL or website address for your store will be abcstore.quickvee.com</li>
                  </ul>
                  <div>
                    <h1>Menu Link</h1>
                  </div>
                  <div className='qvrow'>
                    <div className='col-qv-6'>
                      <div className="input_area">
                        <input className='infoInput merchant-disabled' type="text" name="menuLink" value={infoRecord.menuLink} disabled/>
                        <span className="info-span">@.com</span>
                      </div>
                    </div>
                    <div className='col-qv-6'>
                      <div className="input_area">
                        <input className='infoInput' type="text" name="domain" value={infoRecord.domain} onChange={onChangeHandle}/>
                        <span className="info-span">@.com</span>
                      </div>
                    </div>

                  </div>
                  
              </div>
              
            </div>
          </div>
        </div>
        <div className='box_shadow_div'>
          <div className='infoheader'>
            <div className='qvrow'>
              <div className='col-qv-12'>
               
                <h1>Logo & Banner</h1>
                  <div className={'info-banner'} style={{
                      backgroundImage: !BannersBoolean ? `url('https://sandbox.quickvee.com/upload/banner/${infoRecord.banners ? infoRecord.banners : ''}')`:`url('${infoRecord.banners}')`,
                      backgroundSize: 'cover'
                  }}>
                  {infoRecord.banners ?
                  <div className='info-delete-banner'>
                    <div className='verifiedTableIcon'onClick={()=>handleDelete('banners')}> <img 
                              src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"
                            ></img>
                    </div>
                  </div>
                  :""}
                  <div className='info-banner-image-div'>
                    {
                      infoRecord.image ?
                        <div className='info-delete'><div className='verifiedTableIcon'onClick={()=>handleDelete('image')}> <img 
                          src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"
                        ></img></div></div>

                      
                      :''

                    }
                      <div className="info-file-upload">
                        {
                          infoRecord.image =="" ?
                          <>
                          <label htmlFor="file-input1" className='file-input1'>
                            
                            
                              <img src={infoImage} alt="Upload Image" className='info-image-icon'/>
                              <div className='info-image-logo-position'>
                              <p>Add Logo</p>
                            </div>
                          
                          
                        </label>
                        <input id="file-input1" name='image' style={{ visibility: 'hidden' }} type="file"
                         onChange={onChangeHandle}/>
                          </>
                          :
                          <>
                         
                          <label htmlFor="file-input2" className='file-input1'>
                          {infoRecord.image && <img src={!imageBoolean?`https://sandbox.quickvee.com/upload/`+infoRecord.image : infoRecord.image} alt="Preview" className='info-image' />}
                          </label>
                          <input id="file-input2" name='image' style={{ visibility: 'hidden' }} type="file"
                          onChange={onChangeHandle}/>
                          </>

                        }  
                      </div>
                  </div>
                  <div className='info-upload-image-button'>
                    <label htmlFor="fileInput3">Add Banner</label>
                    <input
                      type="file"
                      id="fileInput3"
                      style={{ display: 'none' }}
                      name='banners'
                      onChange={onChangeHandle}
                    />
                   
                  </div>
                  

                </div>
                <span className='error'>{errors.imageErrors}</span><br/>
                <span className='error'>{errors.bannerErrors}</span>
              </div>
              
            </div>
           

          </div>
        </div>
        {/* ========== */}
        <div className='box_shadow_div'>
          <div className='infoheader'>
            <h1>Address</h1>
              <div className='qvrow'>
                <div className='col-qv-12'>
                    <div className='input_area'>
                      <input 
                          className=''
                          type='text'
                          name="address_1"
                          placeholder='Address Line1'
                          value={infoRecord.address_1}
                          onChange={onChangeHandle}
                      />
                                        {/* <span className='error'>{store.errors.ownerName}</span> */}
                    </div>
                    <div className='input_area'>
                      {/* <label>Owner Name</label> */}
                      <input 
                          className=''
                          type='text'
                          name="address_2"
                          placeholder='Address Line2'
                          value={infoRecord.address_2}
                          onChange={onChangeHandle}
                      />
                                        {/* <span className='error'>{store.errors.ownerName}</span> */}
                    </div>
                </div>
                {/* ------ */}
                <div className='col-qv-12'>
                  <div className='qvrow'>
                    <div className='col-qv-3'>
                      <div className='input_area'>
                        {/* <label>Owner Name</label> */}
                        <input 
                            className=''
                            type='text'
                            name="city"
                            placeholder='City'
                            value={infoRecord.city}
                            onChange={onChangeHandle}
                        />
                                          {/* <span className='error'>{store.errors.ownerName}</span> */}
                      </div>

                    </div>
                    <div className='col-qv-3'>
                    <div className='input_area'>
                        <input 
                            className=''
                            type='text'
                            name="zip"
                            placeholder='zip'
                            value={infoRecord.zip}
                            onChange={onChangeHandle}
                        />
                                          {/* <span className='error'>{store.errors.ownerName}</span> */}
                      </div>

                    </div>
                    <div className='col-qv-3'>
                    <div className='input_area'>
                        {/* <label>Owner Name</label> */}
                        <input 
                            className=''
                            type='text'
                            name="state"
                            placeholder='State'
                            value={infoRecord.state}
                            onChange={onChangeHandle}
                        />
                                          {/* <span className='error'>{store.errors.ownerName}</span> */}
                      </div>

                    </div>
                    <div className='col-qv-3'>
                    <div className='input_area'>
                        <input 
                            className=''
                            type='text'
                            name="phone"
                            placeholder='Phone'
                            value={infoRecord.phone}
                            onChange={onChangeHandle}
                        />
                                          {/* <span className='error'>{store.errors.ownerName}</span> */}
                      </div>

                    </div>

                  </div>

                </div>
                {/* ------*/}
                <div className='col-qv-12'>
                  <div className='qvrow'>
                    <div className='col-qv-6'>

                    </div>
                    <div className='col-qv-6'>
                      <div className='info-update'>
                        <input 
                          type='button'
                          className="blue_btn"
                          value="Update"
                          onClick={handleSubmitInfo}
                        />
                      </div>

                    </div>
                  </div>

                </div>
                {/* --------- */}
               
              </div>
          </div>
        </div>
        {/* =========== */}
    </div>
  )
}

export default Info