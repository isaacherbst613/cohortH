import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';

export default function AutherCard({ id, numOfPosts }) {
    const navigate = useNavigate();

    return (
        <Col>
            <div onClick={(e) => {
                e.preventDefault();
                navigate(`/authersPosts/auther?auther=${id._id}`)
            }}>
                <Card className="user">
                    <Card.Header>Author</Card.Header>
                    <Card.Body>
                        <Card.Title>{id.firstName} {id.lastName}</Card.Title>
                        <Card.Subtitle>{id.email}</Card.Subtitle>
                        <Card.Subtitle>{numOfPosts} posts</Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    )

}
