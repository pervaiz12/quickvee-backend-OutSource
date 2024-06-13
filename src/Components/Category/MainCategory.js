import React, { useState } from 'react'
import CategoryDetail from './CategoryDetail'
import AddCategory from './AddCategory'
import CateDetailsDescription from './CateDetailsDescription'
import EditCategory from './EditCategory'

const MainCategory = () => {
    const [visible, seVisible] = useState("CategoryDetail")
    const [productId, setProductId] = useState()
    return (
        <>

            <div className='q-category-main-page'>
               <CateDetailsDescription />
                {visible === "CategoryDetail" && <CategoryDetail setProductId={setProductId} seVisible={seVisible} />}
                {visible === "CategoryAlert" && <AddCategory seVisible={seVisible} />}
                {visible === "EditCategory" && <EditCategory seVisible={seVisible} productId={productId} />}
            </div>
        </>
    )
}

export default MainCategory