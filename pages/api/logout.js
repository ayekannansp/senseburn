import jwt from "jsonwebtoken";
import cookie from "cookie";

// server-side API to handle logout
const handler = (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", "", {
            maxAge: -1,
            path: "/",
        })
    );
    res.status(200).json({ message: "Logout successful" });
};

export default handler;
