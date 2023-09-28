import * as React from 'react'
import { getDocs,collection,query,where,orderBy } from 'firebase/firestore';
import { database } from '@/settings/firebase.config';
import { Badge } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';

export default function Notification() {

    const [notifications,setNotifications] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const { user } = useAuthContext()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getNotifications = async () => {
        const q = query(
            collection(database,'notifications'),
            where('assignedTo','==',user.email),
            orderBy('createdAt','desc')
        );

        const onSnapShot = await getDocs(q);

        setNotifications(onSnapShot.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }
    getNotifications()
    // console.log(notifications);

    return ( 
        <>  
        <div className='flex flex-col items-center justify-center p-4'>
            <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
                <div className='flex flex-col items-center'>
                <Badge badgeContent={notifications.length} color='primary'>
                    <Notifications color='action'/>
                </Badge>
                <small className='text-secondary'>Notifications</small> 
                </div>
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
            
            {
                notifications.map(notification => (
                    <MenuItem key={notification.id}>
                        <Link href='#'>{notification.data.headline}</Link>
                    </MenuItem>
                ))
            }
            
            </Menu>
        </div>
        </> 
    )
}