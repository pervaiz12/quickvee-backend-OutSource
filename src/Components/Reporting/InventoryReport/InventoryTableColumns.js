import React, { forwardRef } from 'react';
import { Box, Button, Checkbox, Container,  Grid, Typography,Grow } from '@mui/material'
import Dialog from '@mui/material/Dialog';

const TransitionComponent = forwardRef(function Transition(props, ref) {
  return <Grow  in={props.in} timeout={500} ref={ref} {...props} />;
});

const InventoryTableColumns = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog
     maxWidth={'lg'}
    // TransitionComponent={TransitionComponent}
    onClose={handleClose}
    open={open}
    keepMounted
    PaperProps={{
      style: {
        height: '400px', // Fixed height
        maxHeight: '80vh', // Maximum height for responsiveness
      },
    }}
    BackdropProps={{
      style: { backgroundColor: open ? 'transparent' : 'transparent' }, // Set backdrop color to transparent
    }}
    >
    <Container maxWidth="lg">
    <Grid container spacing={2}>
      <Grid size={8}>
        <Typography variant='h5'>
          Choose other measure to show
        </Typography>
      </Grid>
      <Grid offset={1}></Grid>
      <Grid size={2} container spacing={2}>
        <Button  className='btn_cancel'>Cancel</Button>
        <Button variant='contained'>Apply</Button>
      </Grid>
    </Grid>
  
      <Box>
        <Typography variant='h6'>
            Sale
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Revenue</Typography>
              <Box>Total value of items sold</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Gross profit</Typography>
              <Box>Total revenue in the specified period less the total cost of products sold for that period</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Margin (%)</Typography>
              <Box>Percentage of revenue that you keep as gross profit</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Customer count</Typography>
              <Box>Number of unique registered customers served in the specified period</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Sale count</Typography>
              <Box>Total number of sales and returns</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Items sold</Typography>
              <Box>Total number of items sold</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Items sold per day</Typography>
              <Box>Average number of items sold per day</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Average number of items sold per day</Typography>
              <Box>Average number of items sold per day</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Avg. sale value</Typography>
              <Box>Average transaction/sale value</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Discounted (%)</Typography>
              <Box>Average discount given on total sale value (excl. tax)</Box>
          </Grid>
        </Grid>

      </Grid>
      <Box>
        <Typography variant='h6'>
            Product prices & values
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Avg. cost</Typography>
              <Box>Average supply price of a single item</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Inventory cost</Typography>
              <Box>Total value of inventory on hand using average cost</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Cost of goods sold</Typography>
              <Box>Cost of goods sold</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Retail value (excl. tax)</Typography>
              <Box>Total value of inventory on hand using retail price</Box>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Typography variant='h6'>
        Inventory levels
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Current inventory</Typography>
              <Box>Amount of inventory as of today</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Start date inventory</Typography>
              <Box>Amount of inventory as of the start of chosen dates</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Reorder point</Typography>
              <Box>Threshold for inventory being low</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Reorder amount</Typography>
              <Box>Default quantity ordered when added to a purchase order</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Inbound inventory</Typography>
              <Box>Amount of incoming inventory form dispatched purchase orders and send transfers</Box>
          </Grid>
        </Grid>
      </Grid>

      <Box>
        <Typography variant='h6'>
        Inventory performances
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Sell-through rate</Typography>
              <Box>Percentage of solid items out of all items available to be sold</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Return count</Typography>
              <Box>Numbers of sold items returned by customers</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Days cover</Typography>
              <Box>Estimated numbers of days current inventory will last</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Return (%)</Typography>
              <Box>Percentage of solid items that have been returned by customers</Box>
          </Grid>
        </Grid>
      </Grid>


      <Box>
        <Typography variant='h6'>
        Dates
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Created</Typography>
              <Box>Date this product was first added to your store</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>First sale</Typography>
              <Box>Date of the first sale</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Last sale</Typography>
              <Box>Date of last sale</Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} size={3}>
          <Grid size={2}>
           <Checkbox/>
          </Grid>
          <Grid size={10}>
            <Typography variant='h6'>Last received</Typography>
              <Box>Date this product was last received on a purchase order</Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </Dialog>
  );
}

export default InventoryTableColumns;