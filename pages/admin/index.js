import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { getAuth,signOut } from "firebase/auth";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth).then().catch((e)=>{console.error(e)})
    }

    React.useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])

    return (
        <>
            <h1>Only logged in users can view this page</h1>
            <button onClick={handleSignOut}>Signout</button>
        </>
    );
}

export default Page;