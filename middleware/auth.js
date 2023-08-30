// middleware/auth.js
import jwt from "jsonwebtoken";

export const authenticated = (fn) => async (req, res) => {
    const token = req.cookies.auth; // Note the cookie name 'auth' matches what we set in the API

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token using the same 'YOUR_INTERNAL_SECRET' that you used to sign it
        const decoded = jwt.verify(token, "YOUR_INTERNAL_SECRET");
        req.user = decoded.user;

        return await fn(req, res);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
