import React from "react";
import { auth } from "@/settings/firebase.config";
import { signInWithEmailAndPassword }from 'firebase/auth'
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Page(){
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const router = useRouter();
    const { user } = useAuthContext();

    const handleForm = async (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            router.push('/');
        })
        .catch((e) => console.error(e))

    }
    
    React.useEffect(()=>{
        if(user !== null) {
            router.push('/');
        }
    },[])

    return (
        <main className="w-full h-screen flex justify-center items-center px-4 sm:px-0">
            <div className="w-[480px] flex flex-col shadow-md border boreder-blue-400 rounded-lg gap-5 p-4">
                <h1 className="text-3xl text-center text-blue-800">Sign In</h1>
                <form className="bg-white flex flex-col gap-3 p-4 rounded-md" onSubmit={handleForm}>
                    <input 
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full py-3 sm:py-5 px-2 border border-blue-400 rounded-lg bg-white/60"
                    onChange={(e)=> setEmail(e.target.value)}
                    />

                    <input 
                    name="password"
                    type="password" 
                    placeholder="Password"
                    className="w-full py-3 sm:py-5 px-2 border border-blue-400 rounded-lg bg-white/60"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="max-w-[160px] h-12 bg-blue-800 rounded-lg text-white font-bold"
                    >Login</button>
                </form>
                <p>
                    Forgot password? 
                    <Link href='/auth/password-reset' className="text-xl text-blue-800 underline ml-2">Click here to reset.</Link>
                </p>
                <p>
                    Or new user? 
                    <Link href='/auth/signup' className="text-xl text-blue-800 underline ml-2">Signup</Link>
                </p>
            </div>
        </main>
    )
}