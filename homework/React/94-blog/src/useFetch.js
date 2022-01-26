import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(url);
        (async () => {
            try {
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error(response.statusText, response.status);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [url]);

    return [data];
}
