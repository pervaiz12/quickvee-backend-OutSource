import React, { useState } from 'react'
import CategoryDetail from './CategoryDetail'
import AddCategory from './AddCategory'
import CateDetailsDescription from './CateDetailsDescription'

const MainCategory = () => {
    const [visible, seVisible] = useState("CategoryDetail")
    return (
        <>

            <div className='q-category-main-page'>
               <CateDetailsDescription />
                {visible === "CategoryDetail" && <CategoryDetail seVisible={seVisible} />}
                {visible === "CategoryAlert" && <AddCategory seVisible={seVisible} />}

            </div>
        </>
    )
}

export default MainCategory