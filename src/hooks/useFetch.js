import { useEffect, useState } from "react";

export const useFetch = (url, method = "GET", body = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body ? JSON.stringify(body) : null,
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
                console.log("fetch finalizado");
            }
        };

        fetchData();
    }, [url, method, body]);

    return { data, loading, error };
};
