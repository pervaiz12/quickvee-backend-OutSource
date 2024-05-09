// import React from 'react'
// import DraggableTable from '../../reuseableComponents/DraggableTable';
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const TimesheetListing = () => {
//   return (
//    <>
//    <div className='box'>
//               <div className='box_shadow_div_order'>
//                 {/* <h1 className='px-6'>
//                       <TableContainer component={Paper}>
//                           <Table sx={{ minWidth: 500 }}>
//                               <TableHead>
//                                   <TableRow>
                                      
//                                   </TableRow>
//                               </TableHead>
//                               </Table>
//                               </TableContainer>
//                 </h1> */}
//                 <DraggableTable 
//                       tableHead={["sorting", "order", "customer","status","email"]}
//                       tableRow={[{sdasd:"hellow"},{sdasdas:"hellow"}]}
//                 />
//               </div>
//    </div>
   
   
   
//    </>
//   )
// }

// export default TimesheetListing


import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TimesheetListing = ({ tableHead, tableRow }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
                <TableHead>
                    <TableRow>
                        {/* Render table headers */}
                        {tableHead.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Render table rows */}
                    {tableRow.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {tableHead.map((header, headerIndex) => (
                                <TableCell key={headerIndex}>
                                    {/* Render row data based on header */}
                                    {row[header.toLowerCase()] || ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TimesheetListing;
