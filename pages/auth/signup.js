import React from "react";
import { auth } from "@/settings/firebase.config";
import { createUserWithEmailAndPassword, getAuth }from 'firebase/auth'
import { useRouter } from "next/router";

export default function Page() {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth,email,password)
        .then(()=>{
            alert('Account created successfully')
            router.push('/auth/signin')
        }).catch((e)=> console.error(e))
    }

    return (
        <main className="w-full h-screen flex justify-center items-center px-4 sm:px-0">
            <div className="w-[480px] flex flex-col shadow-md border boreder-blue-400 rounded-lg gap-5 p-4">
                <h1 className="text-3xl text-center text-blue-800">Sign up</h1>
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
                    >Create Account</button>
                </form>
            </div>
        </main>
    )
}