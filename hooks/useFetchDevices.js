import { useState, useEffect } from "react";
import axios from "axios";

const useFetchDevices = (id) => {
    const [devices, setDevices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresources`, {
                    instrument: id,
                });
                setDevices(response.data.responseBody);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return { devices, loading, error };
};

export default useFetchDevices;
