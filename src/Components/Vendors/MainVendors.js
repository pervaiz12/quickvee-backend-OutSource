import React, { useState } from 'react'
import VendorsDetail from './VendorsDetail'
import AddVendors from './AddVendors'
import EditVendors from './EditVendors'
import SingleVendorsDetail from './SingleVendorsDetail'

const MainCategory = () => {
    const [visible, setVisible] = useState("VendorsDetail")
    return (
        <>

            <div className='q-category-main-page'>
            
                {/* <div className='q-category-top-detail-section'>
                    <li>In order to use the Quickvee app one Category is required.</li>
                    <li>If you make changes to the Category, the Category status will be pending until the admin approves it.</li>
                    <li>After you've made changes to your menu, select the option "Click Here To Send For Approval To Admin" to get admin approval to update your website.</li>
                </div> */}
               
                {visible === "VendorsDetail" && <VendorsDetail setVisible={setVisible} />}
                {visible === "AddVendors" && <AddVendors setVisible={setVisible} />}
                {visible === "EditVendors" && <EditVendors setVisible={setVisible} />}
                {visible === "SingleVendorsDetail" && <SingleVendorsDetail setVisible={setVisible} />}
            </div>
           
        </>
    )
}

export default MainCategory