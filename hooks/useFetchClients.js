import { useState, useEffect } from "react";
import axios from "axios";

const useFetchClients = (id) => {
    const [clients, setClients] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresources`, {
                    instrument: id,
                });
                setClients(response.data.responseBody);
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

    return { clients, loading, error };
};

export default useFetchClients;
