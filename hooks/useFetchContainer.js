import { useState, useEffect } from "react";
import axios from "axios";

const useFetchContainer = (id) => {
    const [container, setContainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresource`, {
                    resource: id,
                });
                setContainer(response.data.responseBody);
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

    return { container, loading, error };
};

export default useFetchContainer;
