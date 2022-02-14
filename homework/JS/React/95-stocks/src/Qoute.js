import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

export default function Qoute({ companyName }) {

    const apiKey = 'sandbox_c7one6qad3i94t1inmp0';

    const [qoute, setQoute] = useState('');
    const { c, dp } = qoute;

    const [companyInfo] = useFetch(`https://finnhub.io/api/v1/quote?symbol=${companyName}&token=${apiKey}`);

    useEffect(() => {
        setQoute(companyInfo);
    }, [companyInfo]);

    function colorChange() {
        if (dp > 0) {
            return 'green';
        } else if (dp < 0) {
            return 'red';
        } else {
            return 'black';
        }
    }
    return (<div>
        <span>${c | 0}</span>{' | '}<span style={{ color: colorChange() }}>%{dp | 0}</span>
    </div>);
}
