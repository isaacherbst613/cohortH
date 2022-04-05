import { NavLink } from 'react-router-dom';
import { ListGroup, Container } from 'react-bootstrap';
import '../styles/postDisplay.css';
import { useState, useEffect } from 'react';

export default function PostDiplay({selectedPost}) {
    const [name, setName] = useState('');
    const [post, setPost] = useState({title: '', post: ''});
    useEffect(()=>{
        console.log(selectedPost);
        if(selectedPost){
            setName(selectedPost.name);
            setPost(selectedPost.post);
            window.localStorage.setItem('post', JSON.stringify(selectedPost));
        }
    },[selectedPost]);

    useEffect(()=>{
        console.log('refresh');
        if(window.localStorage.getItem('post')){
            setName(JSON.parse(window.localStorage.getItem('post')).name);
            setPost(JSON.parse(window.localStorage.getItem('post')).post);
        }
    },[]);


    return (
        <>
            <Container id="Post-holder">
                <h2 className='fw-bold text-center'>{name}</h2>
                <hr />
                <div className="title ms-2 me-auto">
                    <div className="fw-bold">{post.title}</div>
                    {post.post}
                </div>  <br />
            </Container>

            {/* <Container id="comments-holder">
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
            </Container> */}
        </>
    );
}

