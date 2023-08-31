import axios from "axios";
import { authenticated } from "../../middleware/auth";

export default authenticated(async (req, res) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
                responseBody: null,
            });
        }

        const secret = req.sec;

        const response = await axios.get(
            "https://evalan-dev-mas-webapp.azurewebsites.net/api/containers?page=1",
            {
                headers: {
                    accept: "application/ld+json",
                    Authorization: `Bearer ${secret}`,
                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully retrieved data",
            responseBody: response.data,
        });
    } catch (error) {
        console.error("An error occurred:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            responseBody: null,
        });
    }
});
