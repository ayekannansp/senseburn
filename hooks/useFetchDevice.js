import { useState, useEffect } from "react";
import axios from "axios";

const useFetchDevice = (id) => {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresource`, {
                    resource: id,
                });
                setDevice(response.data.responseBody);
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

    return { device, loading, error };
};

export default useFetchDevice;
