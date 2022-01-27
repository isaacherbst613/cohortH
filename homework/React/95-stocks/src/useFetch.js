import { useEffect, useState } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async () =>{
            try {
                const result = await fetch(url);
                if (!result.ok) {
                    throw new Error(`${result.status} ${result.statusText}`);
                }
                setData(await result.json());
            } catch (error) {
                console.error('fetch error', error);
            }
        })();
    }, [url]);

    return [data];
}
