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

        const { resource } = req.body;
        if (!resource) {
            return res.status(400).json({
                success: false,
                message: "resource is required",
                responseBody: null,
            });
        }

        const secret = req.sec;
        const response = await axios.get(
            "https://evalan-dev-mas-webapp.azurewebsites.net" + resource,
            {
                headers: {
                    accept: "application/ld+json",
                    Authorization: `Bearer ${secret}`,
                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "",
            responseBody: response?.data || {},
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
