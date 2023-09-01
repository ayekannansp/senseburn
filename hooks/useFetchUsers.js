import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUsers = (id) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/getresources`, {
                    instrument: id,
                });
                setUsers(response.data.responseBody);
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

    return { users, loading, error };
};

export default useFetchUsers;
