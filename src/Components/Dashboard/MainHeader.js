import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BiCaretUp} from 'react-icons/bi'

const MainHeader = () => {
  return (
    <>
    <div className="box">
      <div className='box_shadow_div mt_card_header'>
    
            
              <div className="table-responsive">
                <table className="w-full" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th className="">
                        <div className="text-[#707070]  lg:lg:text-[18px] sm:text-[12px] Admin_std font-normal">Gross salse</div>
                        <div className="text-black lg:text-[40px] sm:text-[12px]  font-normal  Admin_std mt-1 mb-1">462.00</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">+21.00%</div>
                       
                        
                      </th>
                      <td className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">-</td>
                      <th>
                        <div className="text-[#707070]  lg:text-[18px] sm:text-[12px] Admin_std font-normal">Return</div>
                        <div className="text-black lg:text-[40px] sm:text-[12px]   font-normal  Admin_std  mt-1 mb-1">0.00</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">NA</div>
                      </th>
                      <td className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">-</td>
                      <th>
                        <div className="text-[#707070]  lg:text-[18px] sm:text-[12px] Admin_std font-normal">Discount</div>
                        <div className="text-black lg:text-[40px] sm:text-[12px] font-normal Admin_std mt-1 mb-1">27.00</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">+21.00%</div>
                       
                      </th>
                      <td className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">=</td>
                      <th>
                        <div className="text-[#707070]  lg:text-[18px] sm:text-[12px] Admin_std font-normal">Net Sales</div>
                        <div className="text-black lg:text-[40px] sm:text-[12px]   font-normal  Admin_std  mt-1 mb-1">435.56</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">+21.00%</div>
                       
                      </th>
                      <td className="vl"></td>
                      <th>
                        <div className="text-[#707070]  lg:text-[18px] sm:text-[12px] Admin_std font-normal">Sales Tax</div>
                        <div className="text-black lg:text-[40px] sm:text-[12px]   font-normal  Admin_std  mt-1 mb-1">47.56</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">+21.00%</div>
                       
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            </div>
         
  
    </>
  );
};

export default MainHeader;