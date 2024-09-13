import React, { useState } from 'react'

export default function useMenuState(initialOption) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(initialOption);
    const [open, setOpen] = useState(false);

    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleClose = (option) =>{
        setAnchorEl(null);
        setOpen(false);
        typeof(option) ==='string' && setSelectedOption(option)
    };

    return{
        anchorEl,
        open,
        selectedOption,
        handleClick,
        handleClose,
    }
}
