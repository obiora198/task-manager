import React from "react";
import CustomDialog from "./customDialog";
import { Button,TextField,IconButton } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { doc,deleteDoc,updateDoc } from "firebase/firestore";
import { database } from "@/settings/firebase.config";
import { useAuthContext } from "@/context/AuthContext";


export default function TaskDisplay({title,description,dueDate,taskId,docUid}) {
    const [taskTitle,setTaskTitle] = React.useState('');
    const [taskDesc,setTaskDesc] = React.useState('');
    const [taskDueDate,setTaskDueDate] = React.useState('');
    const [taskComplete,setTaskComplete] = React.useState(false);

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
    
    // FUNCTION TO UPDATE POST 
    const handleUpdateTask = async () => {
        setOpenUpdateDialog(false);
        await updateDoc(doc(database, 'tasks', taskId),{
            title:taskTitle,
            description:taskDesc,
            dueDate:taskDueDate,
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

    return (
        <>
        <div className="w-[500px] bg-white flex flex-col items-center gap-2 rounded-md shadow-md p-4">
            <div className="w-full flex flex-col gap-2 divide-y rounded-md ">
                <p className="text-2xl font-bold">{title}</p>
                <p className="text-xl">{description}</p>
                <p className="text-sm ">Date due: {dueDate}</p>
            </div>
            <hr />
            <div className="w-full flex items-center justify-around">
                <Button 
                variant='outlined'
                className={user.uid !== docUid ? null : 'hidden'}
                onClick={handleClickOpenUpdateDialog}
                >Edit</Button>

                <Button 
                variant='outlined'
                color="error"
                onClick={handleClickOpenDeleteDialog}
                className={user.uid !== docUid ? null : 'hidden'}
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
            size="small"
            className='w-full'
            value={title}
            onChange={(e) => setTaskTitle(e.target.value)}/>
            <TextField 
            multiline={true}
            className='w-full'
            value={description}
            onChange={(e) => setTaskDesc(e.target.value)}/>
            <TextField 
            multiline={true}
            className='w-full'
            value={dueDate}
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