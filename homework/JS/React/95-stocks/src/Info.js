import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from './useFetch';

export default function Info({companyName}) {
  const apiKey = 'sandbox_c7one6qad3i94t1inmp0';

  const [company, setCompany] = useState('');
  
  const [companyInfo] = useFetch(`https://finnhub.io/api/v1/stock/profile?symbol=${companyName.toUpperCase()}&token=${apiKey}`); 

  useEffect(() => {
    setCompany(companyInfo);
  }, [companyInfo]);



  return (
    <div className='info'>
      <h2>{company.name}</h2>
      <br />
      <p>{company.description}</p>
    </div>
  );
}
