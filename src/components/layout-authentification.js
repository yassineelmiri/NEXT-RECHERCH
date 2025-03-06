import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function LayoutAuthentification(props) {
    const [profile, setProfile] = useState();
    const router = useRouter();
    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        const res = await fetch(`${process.env.NEXT_PUNLIC_API_URL}/api/test/profile`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        if (res.ok) {
            const json = await res.json()
            setProfile(json)
        } else {
            router.push('/signin')
        }
    }
    function Logout(){
        localStorage.removeItem('token')
        router.push('/');
    }
    return(
        <div >
            <div >
                <p>Singed in as: {profile && profile.username}</p>
                <p><button onClick={Logout}>Log out</button></p>
            </div>

        </div>
    )
}