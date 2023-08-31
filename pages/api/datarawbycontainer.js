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

        const { containerId } = req.query;
        if (!containerId) {
            return res.status(400).json({
                success: false,
                message: "containerId is required",
                responseBody: null,
            });
        }

        const secret = req.sec;

        const response = await axios.get(
            "https://evalan-dev-mas-webapp.azurewebsites.net/api/data_raws",
            {
                headers: {
                    accept: "application/ld+json",
                    Authorization: `Bearer ${secret}`,
                },
            }
        );

        const matchingContainers = response?.data["hydra:member"]?.filter(
            (item) => item.containerId === containerId
        );

        if (matchingContainers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching container found",
                responseBody: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Matching container found",
            responseBody: matchingContainers[0],
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
