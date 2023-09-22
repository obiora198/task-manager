import React from "react";
import CustomDialog from "./customDialog";
import { Button,TextField,IconButton } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { doc,deleteDoc,updateDoc } from "firebase/firestore";
import { database } from "@/settings/firebase.config";
import { useAuthContext } from "@/context/AuthContext";


export default function TaskDisplay({title,description,dueDate,completed,author,taskId,docUid}) {
    const [taskTitle,setTaskTitle] = React.useState(title);
    const [taskDesc,setTaskDesc] = React.useState(description);
    const [taskDueDate,setTaskDueDate] = React.useState(dueDate);
    const [taskComplete,setTaskComplete] = React.useState(completed);

    const { user } = useAuthContext();

    //DELETE DIALOG CONTROL >>>> START
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const handleClickOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
    //DELETE DIALOG CONTROL >>>> END
    
    //UPDATE DIALOG CONTROL >>>> START
    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const handleClickOpenUpdateDialog = () => setOpenUpdateDialog(true);
    const handleCloseUpdateDialog = () => setOpenUpdateDialog(false);
    //UPDATE DIALOG CONTROL >>>> END

    //FUNCTION FOR DELETE TASK
    const handleDeleteTask = async () => {
        setOpenDeleteDialog(false);
        await deleteDoc(doc(database,'tasks',taskId))
        .then(() => {
            alert('Task deleted');
        })
        .catch(e => {
            console.error(e);
        })
    }

    const parseDate = (dateObject) => {
        const dateArray = dateObject.split('/');
        const date = new Date(+dateArray[2], dateArray[1]-1, +dateArray[0]);

        return date.toDateString();
    }
    
    // FUNCTION TO UPDATE POST 
    const handleUpdateTask = async () => {
        setOpenUpdateDialog(false);
        await updateDoc(doc(database, 'tasks', taskId),{
            title:taskTitle,
            description:taskDesc,
            dueDate:parseDate(taskDueDate),
            completed:taskComplete,
        },
        {
            merge:true,
        })
        .then(() => {
            alert('Task Updated');
        })
        .catch(e => {
            console.error(e)
        })
    }

    // console.log(user.uid, docUid);

    return (
        <>
        <div className="w-[500px] bg-white flex flex-col items-center gap-2 rounded-md shadow-md p-4">
            <div className="w-full flex flex-col gap-2 divide-y rounded-md ">
                <span className="flex justify-between items-center">
                    <p className="text-2xl font-bold">{title}</p>
                    <span className="flex flex-col text-sm">
                        <small>Created by:</small>
                        <small>{author}</small>
                    </span>
                </span>
                <p className="text-xl">{description}</p>
                <p className="flex justify-between p-4">
                    <span className="text-sm">Date due: {dueDate}</span>
                    <span className="text-green-600 underline">{completed ? 'Completed' : null}</span>
                </p>
            </div>
            <hr />
            <div className={user.uid != docUid ? 'hidden' : "w-full flex items-center justify-around"}>
                <Button 
                variant='outlined'
                onClick={handleClickOpenUpdateDialog}
                >Edit</Button>

                <Button 
                variant='outlined'
                color="error"
                onClick={handleClickOpenDeleteDialog}
                >Delete</Button>
            </div>
        </div>  
        

        {/* DELETE TASK CUSTOM DIALOG  */}
        <CustomDialog 
        openProp={openDeleteDialog} 
        handleCloseProp={handleCloseDeleteDialog} 
        title='Delete Task?'>
            <p>Confirm Task deletion</p>
            <Button 
            variant='outlined' 
            color='error' 
            onClick={handleDeleteTask}>
                Yes, delete
            </Button>
        </CustomDialog>

        {/* UPDATE TASK CUSTOM DIALOG  */}
        <CustomDialog 
        openProp={openUpdateDialog} 
        handleCloseProp={handleCloseUpdateDialog} 
        title='Edit Task'>
            <TextField
            placeholder="Title" 
            size="small"
            className='w-full'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}/>
            <TextField 
            multiline={true}
            placeholder="Description..."
            className='w-full'
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}/>
            <TextField 
            placeholder="Date due eg DD/MM/YYYY"
            size="small"
            className='w-full'
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}/>

           <div className="flex flex-col">
           <Button 
            color="success"
            onClick={()=>setTaskComplete(true)}
            style={{marginTop:8}}>
                <small>Mark complete</small>
                <CheckCircleOutlineIcon />
            </Button>

            <Button 
            variant='outlined' 
            color='primary' 
            onClick={handleUpdateTask}
            style={{marginTop:8}}>
                Update
            </Button>
           </div>
        </CustomDialog>
        </>
    )
}