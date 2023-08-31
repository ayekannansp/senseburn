import React from "react";
import jwt from "jsonwebtoken";
import HomeSection from "@/components/HomeSection";
import Navbarsection from "@/components/shared/Navbarsection";
import Dashboard from "@/components/dashboard/Dashboard";
import SideNav from "@/components/shared/SideNav";

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

export default function Home({ user }) {
    return (
        <>
            <Navbarsection />
            <SideNav/>
            <Dashboard/>
        </>
    );
}
