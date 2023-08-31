import { useState, useEffect } from "react";
import axios from "axios";

const useFetchLocations = (id) => {
    const [locations, setLocations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresources`, {
                    instrument: id,
                });
                setLocations(response.data.responseBody);
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

    return { locations, loading, error };
};

export default useFetchLocations;
