import React, {useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import '../styles/showUser.css';
import useFetch from '../helpers/useFetch';
import PostCard from '../components/PostCard';

export default function ShowPosts() {

    const [limit, setLimit] = useState(0);
    const [loading, data] = useFetch(`/posts?limit=${limit}`);

    if (loading) return <div>Loading...</div>;

    const deconstructedData = data.map(p => {
        const { post, title, date, auther, tags } = p.post;
        return (
            <PostCard
                key={p._id}
                auther={`${auther.firstName} ${auther.lastName}`}
                post={post}
                title={title}
                date={date}
                tags={tags}
                id={p._id} />
        )
    });

    return (
        <Container id="card-holder">
            <Row xs={2} md={4} lg={5}>
                {deconstructedData}
            </Row>
        </Container>
    );
}
