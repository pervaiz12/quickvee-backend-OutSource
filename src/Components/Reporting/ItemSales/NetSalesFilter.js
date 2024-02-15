import React from 'react';
import { useSelector } from 'react-redux';

const NetSalesFilter = () => {
  const NetSalesData = useSelector((state) => state.ItemSalesReportList);
  // console.log(NetSalesData.ItemSalesData)
  return (
    <>
    {NetSalesData && NetSalesData.ItemSalesData && (
      <div className="">
        <div className="">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
              <div className="gap-2 py-4 cursor-pointer bg-grayopacity bg-white px-0 mt-4 mx-0 shadow-md rounded-lg opacity-100 h-auto">
                <div className="flex items-center gap-2 py-1 cursor-pointer">
                  <div className="flex items-center gap-2 flex-col">
                    <div className='q_details_header ml-5'> # Sold</div>
                    <div className='q_details_header ml-5'>{NetSalesData.ItemSalesData[2]}</div>
                  </div>
                </div>
              </div>

              <div className="gap-2 py-4 cursor-pointer bg-grayopacity bg-white px-0 mt-4 mx-0 shadow-md rounded-lg opacity-100 h-auto">
                <div className="flex gap-2 flex-col">
                  <div className='q_details_header ml-5'>Net Sales</div>
                  <div className='ml-5'>{NetSalesData.ItemSalesData[1]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default NetSalesFilter