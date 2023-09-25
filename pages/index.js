import React from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/settings/firebase.config";
import CreateTask from "@/components/CreateTask";
import TaskDisplay from "@/components/TaskDisplay";
import { getDocs,collection } from "firebase/firestore";
import { database } from "@/settings/firebase.config";
import Filter from "@/components/Filter";
import { LogoutOutlined, SpaceDashboardRounded } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import { parseDate } from "@/components/assets";



export default function Page() {
    const { user } = useAuthContext()
    const [tasks,setTasks] = React.useState([]);
    const [filter,setFilter] = React.useState(false);
    const [filteredTasks,setFilteredTasks] = React.useState([]);
    const router = useRouter()

    const handleSignOut = () => {
        signOut(auth)
        .then(()=>{
            router.push("/auth/signin");
        })
        .catch((e)=>{console.error(e)})
    }
    

    //get tasks from firestore
    const getTasks = async () => {
        const response = await getDocs(collection(database, 'tasks'));
        
        setTasks(response.docs.map(doc => {
            return {
                id:doc.id,
                data:{
                    ...doc.data()
                }
            }
        }))
    }
    getTasks();
    
    
    
    React.useEffect(() => {
        if (user == null) {
            router.push("/auth/signin")
        }
    }, [])


    return (
        <>
            <div className="flex flex-col sm:flex-row">
                {/* navbar */}
                <div className="w-[450px] h-screen flex flex-col items-center px-4">
                    <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded-full m-4">
                        <Avatar>
                            {user?.displayName ? user.displayName : user?.email[0]}
                        </Avatar>
                    </div>
                    <div className="w-full h-full flex flex-col justify-around">
                        <Link href='#' className="w-full bg-blue-400 flex items-center gap-4 hover:bg-blue-200 text-white rounded-md p-4">
                            <SpaceDashboardRounded />
                            Dashboard
                        </Link>
                        <button 
                        className="text-red-400 border border-red-600 hover:bg-red-600 hover:text-white rounded-md p-4"
                        onClick={handleSignOut}>
                            <LogoutOutlined/>
                            Signout
                        </button>
                    </div>
                </div>
                {/* navbar end  */}

                {/* main window */}
                <div className="w-full h-screen bg-gray-200 overflow-scroll">
                    <div className="w-full h-[100px] bg-white flex items-center p-4 mb-4">
                        <Filter 
                        tasks={tasks}
                        setTasks={setFilteredTasks}
                        setFilter={setFilter}
                        />
                    </div>
                    <div className="w-full flex flex-col items-center gap-4 pb-4">
                        <CreateTask />

                        {
                            filter ? 
                            filteredTasks.map(task => (
                                <div key={task.id}>
                                    <TaskDisplay 
                                    taskId={task.id}
                                    title={task.data.title}
                                    description={task.data.description}
                                    dueDate={parseDate(task.data.dueDate)}
                                    docUid={task.data.authorId}
                                    completed={task.data.completed}
                                    author={task.data.authorEmail}
                                    assigned={task.data.assignedTo}
                                    />
                                </div>
                            )) :
                            tasks.map(task => (
                                <div key={task.id}>
                                    <TaskDisplay 
                                    taskId={task.id}
                                    title={task.data.title}
                                    description={task.data.description}
                                    dueDate={parseDate(task.data.dueDate)}
                                    docUid={task.data.authorId}
                                    completed={task.data.completed}
                                    author={task.data.authorEmail}
                                    assigned={task.data.assignedTo}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
                {/* main window end  */}
            </div>
        </>
    );
}