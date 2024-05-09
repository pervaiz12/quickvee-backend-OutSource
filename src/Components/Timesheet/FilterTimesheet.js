import React from 'react';
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { Grid } from '@mui/material';


const FilterTimesheet = ({ onClickHandler, listItem }) => {
  return (
      <div className="box">
          <div className="box_shadow_div_order">
            <div className='px-6 py-6 my-6'>
                  <Grid container>
                      <Grid item className="mt-5" xs={12}>
                          <h1 className="text-xl font-medium">Filter By</h1>
                      </Grid>
                  </Grid>

                  <Grid container spacing={4} className="">
                      <Grid item xs={4}>
                          <label>Employee</label>
                          <SelectDropDown
                              heading={"All"}

                              onClickHandler={''}
                              selectedOption={''}
                              dropdownFor={"employee"}
                          />
                      </Grid>
                  </Grid>
            </div>
              
        </div>
     
    </div>
  )
}

export default FilterTimesheet
