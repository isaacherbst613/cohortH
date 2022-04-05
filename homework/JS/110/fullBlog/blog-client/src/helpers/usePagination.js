import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function usePagination(loaded, postsPerPage, data) {

    const [pages, setPages] = useState(1);
    const [postDisplay, setPostDisplay] = useState([]);
    const [postsInPage, setPostsInPage] = useState({ start: 0, end: 3 });
    const btns = [];

    useEffect(() => {
        if(!loaded) return null;
            setPages(Math.ceil(data.auther.posts.length / postsPerPage));
    }, [loaded, data, postsPerPage]);

    useEffect(() => {
        if(!loaded) return null;
            setPostDisplay(data.auther.posts.slice(postsInPage.start, postsInPage.end));
    }, [loaded, postsInPage, data]);


    if(!loaded) return { postDisplay, btns };
    function pagesToShow(page) {        
        let start = page * postsPerPage;
        let end = (page + 1) * postsPerPage;
        end = end > data.auther.posts.length ? data.auther.posts.length : end;
        return { start, end };
    };

    for (let i = 0; i < pages; i++) {
        btns.push(
            <span key={i} className="mt-5 m-1"><Button variant='secondary' size='sm' onClick={() => setPostsInPage(pagesToShow(i))}>{i + 1}</Button></span>
        )
    }

    return ({ postDisplay, btns });
}


