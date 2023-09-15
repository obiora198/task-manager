import React from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { getAuth,signOut } from "firebase/auth";
import CreateTask from "@/components/CreateTask";
import TaskDisplay from "@/components/TaskDisplay";
import { getDocs,collection } from "firebase/firestore";
import { database } from "@/settings/firebase.config";
import Filter from "@/components/Filter";



export default function Page() {
    const { user } = useAuthContext()
    const [tasks,setTasks] = React.useState([]);
    const router = useRouter()
    const auth = getAuth()

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
            <div className="flex">
                {/* navbar */}
                <div className="w-[450px] h-screen flex flex-col items-center px-4">
                    <div className="w-full h-full flex flex-col justify-around">
                        <Link href='#' className="w-full bg-blue-400 hover:bg-blue-600 text-white rounded-md p-4">Link one</Link>
                        <button 
                        className="text-red-400 border border-red-600 rounded-md p-4"
                        onClick={handleSignOut}>Signout</button>
                    </div>
                </div>
                {/* navbar end  */}

                {/* main window */}
                <div className="w-full h-screen bg-gray-200 overflow-scroll">
                    <div className="w-full h-[100px] bg-white p-4 mb-4">
                        <Filter 
                        filterArray={tasks}
                        />
                    </div>
                    <div className="w-full flex flex-col items-center gap-4 pb-4">
                        <CreateTask />

                        {
                            [1,1,1,1,1,1].map(task => (
                                <div key={Math.random()}>
                                    <TaskDisplay 
                                    // taskId={task.id}
                                    title='title'
                                    description='description'
                                    dueDate='00/12/2020'
                                    />
                                </div>
                                // <div key={task.id}>
                                //     <TaskDisplay 
                                //     taskId={task.id}
                                //     title={task.data.title}
                                //     description={task.data.description}
                                //     dueDate={task.data.dueDate}
                                //     />
                                // </div>
                            ))
                        }
                    </div>
                    
                </div>
                {/* main window end  */}
            </div>
        </>
    );
}