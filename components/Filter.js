import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TuneIcon from '@mui/icons-material/Tune';

export default function Filter({tasks,setTasks,setFilter}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const filterByComplete = () => {
    setFilter(true);
    
    const filteredArray = tasks.filter(item => {
      if(item.data.completed == true){
        return item
      }
    })
    
    setTasks(filteredArray);
  };

  const filterByDueDate = () => {
    setFilter(true);
    
    const sortedTasks = tasks.sort((item1,item2) => {
      let date1 = new Date(item1.data.dueDate);
      let date2 = new Date(item2.data.dueDate);
      return date1 > date2 ? 1 : -1;
    })
    
    setTasks(sortedTasks);
    // console.log(tasks);
  };

  const clearFilter = () => {
    setFilter(false);
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