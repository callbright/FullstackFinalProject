import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');  // State to hold the search query
    const [sortType, setSortType] = useState('newest');

    useEffect(() => {
        fetchPosts();
    }, [sortType, search]);  // Also depend on search state

    const fetchPosts = async () => {
        let query = supabase.from('criteria').select();

        // Adding search functionality: filter posts by title
        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        if (sortType === 'newest') {
            query = query.order('created_at', { ascending: false });
        } else if (sortType === 'upvotes') {
            query = query.order('upvotes', { ascending: false });
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search posts by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
                <option value="newest">Newest First</option>
                <option value="upvotes">Most Upvotes</option>
            </select>
            <div className="ReadPosts">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Card key={post.id} id={post.id} title={<Link to={`/post/${post.id}`}>{post.title}</Link>} subtopic={post.subtopic} content={post.content} />
                    ))
                ) : (
                    <h2>No New Posts 😞</h2>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;
