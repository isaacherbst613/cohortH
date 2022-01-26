import { useParams, NavLink } from 'react-router-dom';
import useFetch from './useFetch';
import { ListGroup, Container } from 'react-bootstrap';
import './postDisplay.css';

export default function PostDiplay({selectedPost}) {
    const {title, body} = selectedPost;

    const { userId, userName, postId } = useParams();
    const [data] = useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    return (
        <>
            <Container id="Post-holder">
                <NavLink className='text-center' to={`/${userId}/${userName}`}>Back to Posts</NavLink>
                <h2 className='fw-bold text-center'>{userName}</h2>
                <hr />
                <div className="title ms-2 me-auto">
                    <div className="fw-bold">{title}</div>
                    {body}
                </div>  <br />
            </Container>

            <Container id="comments-holder">
                <ListGroup>
                    {data.map(comment => {
                        return (
                            <ListGroup.Item key={comment.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{comment.name}</div>
                                    {comment.body}
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Container>
        </>
    );
}

