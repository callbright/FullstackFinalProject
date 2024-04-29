import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, title: "", subtopic: "", content: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('criteria')
            .update({ title: post.title, subtopic: post.subtopic, content: post.content })
            .eq('id', id);

        window.location.href = "http://localhost:3000/";
    };

    const deletePost = async () => {
        await supabase
            .from('criteria')
            .delete()
            .eq('id', id);

        window.location.href = "http://localhost:3000/";
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br /><br/>
                <label htmlFor="subtopic">Subtopic</label><br />
                <input type="text" id="subtopic" name="subtopic" value={post.subtopic} onChange={handleChange} /><br /><br/>
                <label htmlFor="content">Content</label><br />
                <textarea rows="5" cols="50" name="content" id="content" value={post.content} onChange={handleChange}></textarea>
                <br/>
                <input type="submit" value="Submit" />
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
