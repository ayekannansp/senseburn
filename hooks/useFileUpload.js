import { useState } from "react";
import axios from "axios";

const useFileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const onUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFilePath(res.data.filePath);
            console.log("File uploaded successfully", res);
        } catch (err) {
            setError(err);
            console.error("Error uploading file", err);
        } finally {
            setLoading(false);
        }
    };

    return { onUpload, loading, error, filePath };
};

export default useFileUpload;
