import { useState, useEffect } from "react";
import axios from "axios";

const useFetchClient = (id) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresource`, {
                    resource: id,
                });
                setClient(response.data.responseBody);
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

    return { client, loading, error };
};

export default useFetchClient;
