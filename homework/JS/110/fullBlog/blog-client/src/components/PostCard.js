import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';

export default function PostCard({ auther, title, date, tags, id }) {
    const navigate = useNavigate();
    return (
        <Col>
            <div onClick={(e) => {
                e.preventDefault();
                navigate(`/post/${id}`)
            }}>
                <Card className="user">
                    <Card.Header>Post</Card.Header>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>auther:<br />{auther}</Card.Subtitle>
                        <Card.Subtitle>posted on {date.substr(5, 5)}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    )
}
