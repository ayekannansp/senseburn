import Containers from "@/components/Containers";
import React from "react";
import jwt from "jsonwebtoken";
import Navbarsection from "@/components/shared/Navbarsection";
import SideNav from "@/components/shared/icon/SideNav";
import Location from "@/components/locations";

export async function getServerSideProps(context) {
    const token = context.req.cookies.auth;

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
function location() {
    return (
        <>
            <Navbarsection />
            <SideNav />
            <Location />
        </>
    );
}

export default location;
