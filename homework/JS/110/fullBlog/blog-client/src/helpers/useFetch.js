import { useState, useEffect } from "react";
export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(url);
        (async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText, response.status);
                }
                const fetchedData = await response.json();
                console.log(fetchedData);
                setData(fetchedData);
            } catch (error) {
                console.error('fetch error' + error);
            }
        })();
    }, [url]);

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    return [loading, data];
} 
