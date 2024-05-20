import React,{useEffect,useState} from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css';cls

import {CustomerFunction } from '../../../Redux/features/user/customerSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuthDetails } from '../../../Common/cookiesHelper';



const Customer=()=> {
  const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerRecord = useSelector(
    (state) => state.customerRecord,
  );
  let data={type:2,...userTypeData}


  useEffect(()=>{
    dispatch(CustomerFunction(data))

  },[])

  // ------------------------------------
  const [selectedAction, setSelectedAction] = useState('');
  const [searchRecord,setSearchRecord]=useState('')

  // const handleSelectChange = (e) => {
  //   const selectedUrl = e.target.value;
  //   const urlParts = selectedUrl.split('/');
  //   if(urlParts[2]=="editCustomer"){
  //     navigate(`${selectedUrl}`);
     
  //   }else {
  //     console.log('hello delet')
  //   }
  // };
  // ----------------------------------
  const handleSearchInputChange=(e)=>{
    setSearchRecord(e.target.value)
  }
  const filteredAdminRecord = customerRecord && customerRecord.CustomerRecord &&  Array.isArray(customerRecord && customerRecord.CustomerRecord)
  ? customerRecord.CustomerRecord.filter(result =>
      (result.owner_name && result.owner_name.toLowerCase().includes(searchRecord.toLowerCase())) ||
      (result.email && result.email.toLowerCase().includes(searchRecord.toLowerCase())) ||
      (result.phone && result.phone.includes(searchRecord))
    )
  : [];

 


  // const{customerRecord,handleEditCustomer,handleDeleteCustomer}=CustomerFunction()
  return (
    <div className='q-order-main-page'>
    <div className='box'>
    <div className='box_shadow_div'>
      <div className='qvrow'>
        <div className='col-qv-8'>
          <div className='btn-area'>
            <Link to="/users/addMerchant"className='blue_btn'>ADD</Link>
          </div> 
        </div>
        <div className='col-qv-4'>
            <div className='seacrh_area'>
            <div className="input_area">
              <input className="" type="text" value={searchRecord}
               onInput={handleSearchInputChange}
               placeholder="Search..."
               autoComplete="off"
               />
            </div>
            </div>
        </div>

      </div>
      {/* <div className='btn-area'>
        <Link to="/users/addMerchant"className='blue_btn'>ADD</Link>
      </div> */}
      <div className='table_main_area'>
        <div className='table_header_sticky'>
          <div className='table_header'>
            <p className='table25'>Name</p>
            <p className='table30'>Email</p>
            <p className='table20'>Phone</p>
            <p className='table20'>User Type</p>
            <p className='table5'>Action</p>
          </div>
        </div>
          <div className='table_body'>
            {
            // Array.isArray(customerRecord && customerRecord.CustomerRecord) && customerRecord.CustomerRecord.map((result,index)=>{
              Array.isArray(customerRecord && customerRecord.CustomerRecord) && filteredAdminRecord.map((result,index)=>{
              // console.log(result)
              return(
                <div className='table_row' key={index}>
                  <p className='table25'>{result.name}</p>
                  <p className='table30'>{result.email}</p>
                  <p className='table20'>{result.phone}</p>
                  <p className='table20'>{result.user_type}</p>
                  <div className='table5' >
                  <div ><div className='verifiedTableIcon'><Link to={`/users/editCustomer/${result.id}`}><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></Link> <Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link></div></div>
                  {/* <div className='col-qv-6'>
                  <div className=''>
                    <select
                    value={selectedAction}
                    onChange={handleSelectChange}
                    >
                    <option  value="" disabled hidden></option>
                    <option value={`/users/editCustomer/${result.id}`}>Edit</option>
                    <option value={`/users/deleteCustomer/${result.id}`}>Delete</option>
                    
                    </select>
                  </div>
                    
                  </div> */}
                  
                  </div>
                </div>

              )
            
            })
            }

            
          </div>
      </div>
    </div>
    </div>
    </div>
  )
}
export default Customer
