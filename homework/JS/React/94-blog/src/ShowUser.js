import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './showUser.css';
import useFetch from './useFetch';

export default function ShowUser() {

/*     const [users, setUsers] = useState([]); */
    const navigate = useNavigate();
    const [data] = useFetch('https://jsonplaceholder.typicode.com/users');

    return (
        <Container id="card-holder">
            <Row xs={2} md={4} lg={5}>
                {data.map(user => {
                    return (
                        <Col key={user.id}>
                        <div onClick={(e)=>{
                            e.preventDefault();
                            navigate(`/${user.id}/${user.name}`)
                        }}>
                            <Card id={user.id} className="user">
                                <Card.Header>Author</Card.Header>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Subtitle>{user.website}</Card.Subtitle>
                                    <div>{user.company.name}</div>
                                </Card.Body>
                            </Card>
                        </div>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    );
}
