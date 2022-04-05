import React , { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ShowUser from './pages/ShowAuthers';
import ShowPosts from './pages/ShowPosts';
import UserPost from './pages/AuthersPosts';
import PostDiplay from './components/PostDiplay';
import PageNotFount from './pages/PageNotFount';
import HomePage from './pages/HomePage';
import AddPost from './components/AddPost';
import LoginForm from './pages/LoginForm';


export default function App() {

    const [selectedPost, setPost] = useState('');
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route path="/" element={<HomePage />} />
                
                <Route path="/addPost" element={<AddPost />} />
                <Route path="/authers" element={<ShowUser />} />
                <Route path="/posts" element={<ShowPosts />} />
                <Route path="/authersPosts/auther" element={<UserPost setSelectedPost={setPost}/>} />
                <Route path="/post/:postId" element={<PostDiplay selectedPost={selectedPost}/>} />
            </Route>
            <Route path="/signup" element={<LoginForm />} />
            <Route path="*" element={<PageNotFount />} />
        </Routes>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
