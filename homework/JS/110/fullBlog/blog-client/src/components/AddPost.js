import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../helpers/useForm';

export default function AddPost() {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            navigate('/');
        } catch (e) {
            console.error(e);
        }
    }
    /*  post:
            {
                _id: Mongo.ObjectId(),
                title: title,
                post: post,
                date: new Date(),
                tags: tags,
                auther: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                }
            } */

            ///update to take auther info from session/user
    const [values, setValues] = useForm({ firstName: '', lastName: '', email: '', title: '', post: '', tags: [] });
    const [tagStr, setTagStr] = useState('');

    const setTags = (e) => {
        setTagStr(e.target.value);
        let tags = e.target.value.replaceAll(' ','').split(',');
        setValues(e, tags);
    }

    return (
        <>
            <form id='addPost' onSubmit={onSubmit}>      
                <label>
                    First Name:
                    <input type="text" name="firstName" value={values.firstName} onChange={setValues} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={values.lastName} onChange={setValues} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={values.email} onChange={setValues} />
                </label>
                <label>
                    Post Title:
                    <input type="text" name="title" value={values.title} onChange={setValues} />
                </label>
                <label>
                    Post:
                    <textarea name="post" value={values.post} onChange={setValues} />
                </label>
                <label>
                    Tags:
                    <sub>separate with commas</sub>
                    <input type="text" name="tags" value={tagStr} onChange={setTags} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
