import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/showUser.css';
import useFetch from '../helpers/useFetch';
import AutherCard from '../components/AutherCard';

export default function ShowUser() {

    const [loading, data] = useFetch('/authers');

    if (loading) return <div>Loading...</div>;

    return (
        <Container id="card-holder">
            <Row xs={2} md={4} lg={5}>
                {data.map((res) => {
                    return (
                        <AutherCard
                            key={res._id._id}
                            id={res._id}
                            numOfPosts={res.posts}
                        />
                    )
                })}
            </Row>
        </Container>
    );
}
