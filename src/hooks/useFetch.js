import {useEffect, useState} from "react";

export const useFetch = (url, method, body) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = fetch(url, {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        });

        getData
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((error) => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                console.log("fetch finalizado");
                setLoading(false);
            });
    }, []);

    return {data, loading, error};
}
