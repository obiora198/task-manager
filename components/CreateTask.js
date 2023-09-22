import React from "react";
import { database } from "@/settings/firebase.config";
import { collection,addDoc } from "firebase/firestore";
import { TextField,Button } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";



export default function CreateTask() {
    const [title,setTitle] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [dueDate,setDueDate] = React.useState('');

    const { user } = useAuthContext();
    const parseDate = (dateObject) => {
        const dateArray = dateObject.split('/');
        const date = new Date(+dateArray[2], dateArray[1]-1, +dateArray[0]);

        return date.toDateString();
    }

    

    const handleCreateTask = async () => {
        const response = await addDoc(collection(database,'tasks'),{
            title:title,
            description:description,
            dueDate: parseDate(dueDate),
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