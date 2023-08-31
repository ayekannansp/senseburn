import Containers from '@/components/containers/Containers'
import React from 'react'
import jwt from "jsonwebtoken";
import Navbarsection from "@/components/shared/Navbarsection";
import SideNav from "@/components/shared/icon/SideNav";
import Devices from '@/components/devices/Devices';



export async function getServerSideProps(context) {
    const token = context.req.cookies.auth;
    console.log("TKN =>", token);

    if (!token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(token, "YOUR_INTERNAL_SECRET");
        const user = decoded.user;
        console.log("USR =>", user);
        return { props: { user } };
    } catch (error) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
}
function devices() {
    return (
        <>
            <Navbarsection />
            <SideNav/>
            <Devices/>
        </>
    )
}

export default devices