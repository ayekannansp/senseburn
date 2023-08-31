// pages/api/auth.js
import axios from "axios";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            // Make POST request to external auth service
            const { data } = await axios.post(
                "https://evalan-dev-mas-webapp.azurewebsites.net/authentication_token",
                {
                    email: username,
                    password: password,
                }
            );

            // Get the JWT token from the response
            const externalJwtToken = data.token;

            // Optional: Sign this JWT token (or create a new one)
            const internalJwtToken = jwt.sign(
                { user: username, sec: externalJwtToken },
                "YOUR_INTERNAL_SECRET",
                { expiresIn: "1h" }
            );

            // Set JWT as a cookie
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("auth", internalJwtToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    maxAge: 3600,
                    path: "/",
                })
            );

            res.status(200).json({ message: "Authentication successful" });
        } catch (error) {
            res.status(401).json({ message: "Authentication failed" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;
