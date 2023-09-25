import React from "react";
import { database } from "@/settings/firebase.config";
import { collection,addDoc } from "firebase/firestore";
import { TextField,Button } from "@mui/material";
import ListAllUsers from "./ListAllUsers";
import { useAuthContext } from "@/context/AuthContext";



export default function CreateTask() {
    const [title,setTitle] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [dueDate,setDueDate] = React.useState('');
    const [assignedTo,setAssignedTo] = React.useState('');

    const { user } = useAuthContext();

    //send notifications to user after assigning task
    const sendNotification = async () => {
        const response = await addDoc(collection(database,'notifications'),{
            title:'You have been assigned a task!',
            description:description,
            dueDate: dueDate,
        })
        .then(() => null)
        .catch(error => console.error(error)); 
    }


    
    //function to create tasks in firebase
    const handleCreateTask = async () => {
        const response = await addDoc(collection(database,'tasks'),{
            title:title,
            description:description,
            dueDate: dueDate,
            assignedTo:assignedTo,
            completed:false,
            authorId:user.uid,
            authorEmail:user.email,
        })
        .then(() => {
            setTitle('')
            setDescription('')
            setDueDate('')
            alert('Task posted successfully')


        })
        .catch(error => console.error(error));
    }

    return(
        <div className='w-[500px] bg-white flex flex-col justify-center items-center rounded-md shadow-md p-4'>
            <h1 className="text-2xl text-blue-800">Create new task</h1>
            <div className='w-full flex flex-col gap-2'>
                <TextField 
                placeholder="Title" 
                size="small"
                value={title}
                onChange={(e)=> setTitle(e.target.value)} />

                {title.length > 0 ? 
                    <div className="w-full flex flex-col gap-2">
                        <TextField 
                        multiline={true}
                        placeholder="Description..."
                        className='w-full'
                        value={description}
                        onChange={(text) => setDescription(text.target.value)}/>

                        <TextField
                        size="small" 
                        placeholder="Date due eg DD/MM/YYYY" 
                        value={dueDate}
                        onChange={(e)=> setDueDate(e.target.value)}/>

                        <div className="flex items-center gap-4">
                            <span>Asign Task:</span>
                            <ListAllUsers
                            setAssigned={setAssignedTo}/>
                        </div>

                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        onClick={handleCreateTask}>Post</Button> 
                    </div>
                : null}
                
            </div>
        </div>
    )
}