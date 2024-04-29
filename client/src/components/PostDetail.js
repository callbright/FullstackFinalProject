import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { id } = useParams();

    const fetchPost = useCallback(async () => {
        const { data, error } = await supabase
            .from('criteria')
            .select('*')
            .eq('id', id)
            .single();

        if (!error) {
            setPost(data);
        }
    }, [id]);  // Dependency on `id`

    const fetchComments = useCallback(async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', parseInt(id));

        if (!error) {
            setComments(data);
        }
    }, [id]);  // Dependency on `id`

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [fetchPost, fetchComments]);

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
