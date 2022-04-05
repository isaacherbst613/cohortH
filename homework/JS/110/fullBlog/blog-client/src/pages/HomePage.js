import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const navigate = useNavigate();

    const handleAClick = () => {
        navigate('/authers');
    }
    const handlePClick = () => {
        navigate('/posts');
    }

    return (
        <>
            <Button id='cardButton' onClick={handleAClick}>Authers</Button>
            <Button id='cardButton' onClick={handlePClick}>Posts</Button>
        </>
    )
}
