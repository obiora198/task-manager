import React from "react";
import { sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/router";
import { auth } from "@/settings/firebase.config";


export default function PasswordReset() {
    const router = useRouter();
    const [email,setEmail] = React.useState();
    
    const handleSubmit = () => {
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('Password reset email sent')
            router.push('/auth/asignin');
        })
        .catch(e => {
            console.error(e)
        })
    }


    return (
        <>
            <main className="w-full h-screen flex justify-center items-center px-4 sm:px-0">
                <div className="w-[480px] flex flex-col shadow-md border boreder-blue-400 rounded-lg gap-5 p-4">
                    <h1 className="text-3xl text-center text-blue-800">Reset apssword</h1>
                    <form className="bg-white flex flex-col gap-3 p-4 rounded-md" onSubmit={handleSubmit}>
                        <input 
                        name="email"
                        type="email"
                        placeholder="Email your registered address"
                        className="w-full py-3 sm:py-5 px-2 border border-blue-400 rounded-lg bg-white/60"
                        onChange={(e)=> setEmail(e.target.value)}
                        />

                        <button type="submit" className="max-w-[160px] h-12 bg-blue-800 rounded-lg text-white font-bold"
                        >Submit</button>
                    </form>
                </div>
            </main>
        </>
    )
}