import React from 'react';
import Header from './Header';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ShowUser from './ShowUser';
import UserPost from './UserPost';
import PostDiplay from './PostDiplay';
import PageNotFount from './PageNotFount';


export default function App () {

  const [selectedPost, setPost] = useState([]);
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<ShowUser />} />
              <Route path=":userId/:userName" element={<UserPost setPost={setPost} />} />
              <Route path=":userId/:userName/:postId" element={<PostDiplay selectedPost={selectedPost}/>} />
            </Route>
            
            <Route path="*" element={<PageNotFount />} />
          </Routes>
        </BrowserRouter>
      );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
