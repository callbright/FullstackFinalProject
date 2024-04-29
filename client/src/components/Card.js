import React, { useState, useEffect } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';

const Card = (props) => {
  const [count, setCount] = useState(0);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('criteria')
        .select('upvotes, created_at')
        .eq('id', props.id)
        .single();

      if (data) {
        setCount(data.upvotes);
        setCreatedAt(formatDistanceToNow(new Date(data.created_at), { addSuffix: true }));
      } else {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.id]);

  const updateCount = async (event) => {
    event.preventDefault();

    const newCount = count + 1;
    setCount(newCount);  // Optimistically update the frontend

    const { error } = await supabase
      .from('criteria')
      .update({ upvotes: newCount })
      .eq('id', props.id);

    if (error) {
      console.error('Failed to update upvotes:', error);
      setCount(count - 1);  // Revert the optimistic update on error
      alert('Failed to update upvotes. Please try again!');
    }
  };

  return (
    <div className="Card">
      <h2>{props.title}</h2>
      <h3>{"Subtopic: " + props.subtopic}</h3>
      <p>{props.content}</p>
      <p className="created-at">{"Created " + createdAt}</p>
      <button className="upvoteButton" onClick={updateCount}>
        Upvotes ⬆️ {count}
      </button>
      <Link to={`/edit/${props.id}`}><button className="editButton">Edit Post</button></Link>
    </div>
  );
};

export default Card;
