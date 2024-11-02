
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const response = await fetch('/posts');
    const data = await response.json();
    setPosts(data);
  };

  const createPost = async () => {
    await fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'sampleUser', content }),
    });
    setContent("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>InviteNetwork</h1>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />
      <button onClick={createPost}>Post</button>
      <div>
        {posts.map((post) => (
          <div key={post.$id}>
            <p>{post.content}</p>
            <span>By User: {post.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
