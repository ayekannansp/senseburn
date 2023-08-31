import AddPatient from '@/components/addPatient/AddPatient'
import Navbarsection from '@/components/shared/Navbarsection'
import React from 'react'

import jwt from "jsonwebtoken";
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

function newpatient({ user }) {
    return (
        <>
            <Navbarsection />
            <AddPatient />
        </>
    )
}

export default newpatient