import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';

export default function Filter({filterArray,callback1,callback2}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const filterByComplete = () => {
    const filteredArray = filterArray.filter(item => {
        if(item.data.completed == true){
            return item
        }
    })

    callback1(filteredArray);
  };

  const filterByDueDate = () => {
    const sortedArray = filterArray.sort((item1,item2) => {
        let date1 = new Date(item1.data.dueDate).getTime();
        let date2 = new Date(item2.data.dueDate).getTime();
        date1 > date2 ? 1 
        : date1 < date2 ? -1 
        : 0 ;
    })

    callback1(sortedArray);
  };

  const clearFilter = () => {
    callback2();
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <TuneIcon />
        Filter
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={filterByDueDate}>By due date</MenuItem>
        <MenuItem onClick={filterByComplete}>By completion status</MenuItem>
        <MenuItem onClick={clearFilter}>Clear filter</MenuItem>
        
      </Menu>
    </div>
  );
}