import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { ListGroup, Container, Button } from 'react-bootstrap';
import './userPost.css';
import { useEffect, useState } from 'react';


export default function UserPost({ setPost }) {
    const { userId, userName } = useParams();
    const [pages, setPages] = useState(1);
    const [postsInPage, setPostsInPage] = useState({ start: 0, end: 3 });
    const btns = [];
    const [postDisplay, setPostDisplay] = useState([]);
    const [data] = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    const navigate = useNavigate();
    const postsPerPage = 3;

    useEffect(() => {
        setPages(Math.ceil(data.length / postsPerPage));
    }, [data]);

    useEffect(() => {
        setPostDisplay(data.slice(postsInPage.start, postsInPage.end));
    }, [postsInPage, data]);


    function pagesToShow(page) {
        let start = page * postsPerPage;
        let end = (page + 1) * postsPerPage;
        end = end > data.length ? data.length : end;
        return { start, end };
    };

    for (let i = 0; i < pages; i++) {
        btns.push(
            <span key={i} className="mt-5 m-1"><Button variant='secondary' size='sm' onClick={() => setPostsInPage(pagesToShow(i))}>{i + 1}</Button></span>
        )
    }


    return (
        <Container id="Posts-holder">
            <h2 className='fw-bold text-center' onClick={(e) => {
                e.preventDefault();
                navigate(`/${userId}/${userName}`)
            }}>{userName}</h2>
            <hr />

            <ListGroup variant='flush'>
                {postDisplay.map(post => {
                    let postBody;
                    if (post.body.length > 80) {
                        postBody = post.body.slice(0, 80) + '...';
                    }
                    return (
                        <ListGroup.Item key={post.id}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{post.title}</div>
                                {postBody}
                                <span size="sm" className="ms-4 read-more" onClick={(e) => {
                                    e.preventDefault();
                                    setPost({ title: post.title, body: post.body });
                                    navigate(`/${userId}/${userName}/${post.id}`)
                                }}>Read More</span>
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <div className="d-flex justify-content-center">
                {btns}
            </div>

        </Container>
    );
}
