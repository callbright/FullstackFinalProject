import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import PostDetail from './components/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <h1>LeReddit 👑 - A LeBron James Community Forum!</h1>
          <h2>A website dedicated to discussing all things to do with one of the greatest athletes of all time, LeBron James.</h2>
          <Link to="/"><button className="headerBtn">Home</button></Link>
          <Link to="/new"><button className="headerBtn">Create New Post</button></Link>
        </div>
        <Routes>
          <Route path="/" element={<ReadPosts />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
