import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('criteria')
            .select('*')
            .eq('id', id)
            .single();

        if (!error) {
            setPost(data);
        }
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', parseInt(id));

        if (!error) {
            setComments(data);
        }
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const postComment = async () => {
        const { data, error } = await supabase
            .from('comments')
            .insert([
                {
                    post_id: parseInt(id),
                    content: comment,
                    created_at: new Date().toISOString()
                }
            ]);

        if (!error && data && data.length > 0) {
            setComments([...comments, data[0]]);
            setComment('');
            alert('Comment added successfully!');
        } else if (error) {
            alert('Failed to post comment. Please try again!');
        }
    };

    return (
        <div>
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <div>
                        <h2>Comments</h2>
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                        <div>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <button onClick={postComment}>Post Comment</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading post details...</p>
            )}
        </div>
    );
};

export default PostDetail;
