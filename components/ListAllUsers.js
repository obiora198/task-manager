import * as React from 'react'
import { TextField,Autocomplete } from '@mui/material'
import { database } from '@/settings/firebase.config';
import { collection,getDocs } from "firebase/firestore";

export default function ListAllUsers({setAssigned}) {
    const [users,setUsers] = React.useState([]);

    const getUsers = async () => { 
        const res = await getDocs(collection(database,'users'))

        setUsers(res.docs.map(doc => {
            return {
                id:doc.id,
                data: {
                    ...doc.data()
                }
            }
        }))
    }
    getUsers()

    const usersDetails = []
    users.forEach(user => {
        usersDetails.push(user.data.userEmail);
    });

    return (
        <>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={usersDetails}
        size='small'
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Users" />}
        onChange={(event,newValue) => setAssigned(newValue)}
        />
        </>
    )
}