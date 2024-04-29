import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", subtopic: "", content: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('criteria')
            .insert([
                { title: post.title, subtopic: post.subtopic, content: post.content }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Insert successful', data);
            window.location.href = "/"; 
        }
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br /><br/>

                <label htmlFor="subtopic">Subtopic</label><br />
                <input type="text" id="subtopic" name="subtopic" onChange={handleChange} /><br /><br/>

                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="60" id="content" name="content" onChange={handleChange} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;
