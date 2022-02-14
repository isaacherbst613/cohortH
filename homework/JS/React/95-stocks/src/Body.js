import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import useFetch from './useFetch';
import Info from './Info';
import './body.css';
import Qoute from './Qoute';

export default function Body() {
    const apiKey = 'sandbox_c7one6qad3i94t1inmp0';

    const [inputTickets, setInputTickets] = useState('');
    const [availableTickets, setAvailableTickets] = useState([]);

    const [value, setValue] = useState('');

    const [availSymbols] = useFetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`/* './testing.json' */);


    useEffect(() => {
        setAvailableTickets(availSymbols);
    }, [availSymbols]);

    const handleClick = () => {
        setInputTickets(value);
    };

    const filterMenu = () => {
        const filtered = availableTickets.filter(child => !value || child.symbol.toLowerCase().startsWith(value.toLowerCase()));
        if (filtered.length > 0) {
            return filtered.sort((a, b) => a.symbol.localeCompare(b.symbol));
        } else {
            return [{ symbol: 'No results found', description: 'please try again' }];
        }
    }

    return <div className='w-50 m-auto'>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
                Enter Stock Ticker Symbol
            </InputGroup.Text>

            <Dropdown align='end' autoClose={false}>
                <FormControl placeholder="AAPL" value={value || 'AAPL'} required onChange={e => {

                    setValue(e.target.value);
                }} />
                <Dropdown.Toggle split id="dropdown" variant="secondary" />

                <Dropdown.Menu className='dropdown'>
                    {filterMenu().map((ticket) => {
                        return <Dropdown.Item className='dropItem' key={ticket.symbol} id={ticket.symbol}
                            onClick={e => setValue(e.target.id)}>{ticket.symbol} - {ticket.description}
                        </Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-secondary" onClick={() => handleClick()}>
                update
            </Button>
        </InputGroup>


        <Qoute companyName={inputTickets} />
        <hr />
        <Info companyName={inputTickets} />


    </div>;
}
