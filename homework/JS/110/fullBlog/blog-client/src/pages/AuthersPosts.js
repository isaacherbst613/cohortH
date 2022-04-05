import { useNavigate } from 'react-router-dom';
import useFetch from '../helpers/useFetch';
import useQuery from '../helpers/useQuery';
import usePagination from '../helpers/usePagination';
import { ListGroup, Container } from 'react-bootstrap';
import '../styles/userPost.css';

export default function UserPost({setSelectedPost}) {

    const query = useQuery();
    const autherId = query.get('auther');
    const [loading, data] = useFetch(`/authersPosts/${autherId}`);
    const navigate = useNavigate();
    const { postDisplay, btns } = usePagination(!loading, 3, data);

    let loadedDisplay;
    if (data) {
        const { firstName, lastName } = data.auther;
        
        loadedDisplay = (
            <Container id="Posts-holder">
                <h2 className='fw-bold text-center' onClick={(e) => {
                    e.preventDefault(); 
                }}>{firstName} {lastName}</h2>
                <hr />

                <ListGroup variant='flush'>
                    {postDisplay.map(pd => {
                        const { _id, post, title, date } = pd;
                        let postBody;
                        if (post.length > 100) {
                            postBody = post.slice(0, 100) + '...';
                        }
                        return (
                            <ListGroup.Item key={_id}>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{title}</div>

                                    {postBody || post}
                                    <span size="sm" className="ms-4 read-more" onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedPost({name: `${firstName} ${lastName}`, post: pd});
                                        console.log(pd);
                                        navigate(`/post/${_id}`); 
                                    }}>Read More</span>
                                    <div className="fw-light">posted on {date.substr(5, 5)}</div>
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
    }else{
        loadedDisplay = (
            <Container id="Posts-holder">
                <h2 className='fw-bold text-center'>No Posts</h2>
            </Container>
        );
    }

    return (
        <>{loadedDisplay}</>
    );
}
