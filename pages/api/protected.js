// pages/api/protected.js
import { authenticated } from "../../middleware/auth";

export default authenticated((req, res) => {
    res.json({ data: "This is protected data." });
});
